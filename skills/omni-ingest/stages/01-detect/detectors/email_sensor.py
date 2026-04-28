"""
Email Sensor - IMAP email poller and attachment extractor.

Monitors an IMAP mailbox for new emails, extracts attachments,
and yields events for the detection pipeline.
"""

import imaplib
import email
import ssl
import time
from email.message import Message
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from typing import List, Dict, Optional, Any, Iterator
from dataclasses import dataclass, field
from datetime import datetime, timezone
import tempfile
import os


@dataclass
class EmailAttachment:
    """Represents an email attachment."""
    filename: str
    content_type: str
    payload: bytes
    content_id: Optional[str] = None
    size: int = 0

    def __post_init__(self):
        if self.size == 0 and self.payload:
            self.size = len(self.payload)


@dataclass
class EmailEvent:
    """Represents a detected email event."""
    type: str = "email_received"
    source: str = "email_sensor"
    timestamp: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    data: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        """Convert event to dictionary."""
        return {
            'type': self.type,
            'source': self.source,
            'timestamp': self.timestamp.isoformat(),
            'data': self.data
        }


class EmailSensor:
    """
    IMAP email poller and attachment extractor.
    
    Connects to an IMAP server, polls for new emails,
    extracts attachments, and yields EmailEvent objects.
    
    Configuration:
        host: IMAP server hostname (default: imap.example.com)
        port: IMAP port (default: 993 for SSL)
        username: Authentication username
        password: Authentication password
        mailbox: Mailbox to monitor (default: INBOX)
        scan_interval: Seconds between polls (default: 60)
        mark_as_read: Mark emails as read after fetching (default: True)
        download_attachments: Save attachments to disk (default: True)
        attachment_dir: Directory for saved attachments (default: system temp)
    """
    
    def __init__(
        self,
        host: str = "imap.example.com",
        port: int = 993,
        username: Optional[str] = None,
        password: Optional[str] = None,
        mailbox: str = "INBOX",
        scan_interval: int = 60,
        mark_as_read: bool = True,
        download_attachments: bool = True,
        attachment_dir: Optional[str] = None
    ):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.mailbox = mailbox
        self.scan_interval = scan_interval
        self.mark_as_read = mark_as_read
        self.download_attachments = download_attachments
        self.attachment_dir = attachment_dir or tempfile.gettempdir()
        
        self._connection: Optional[imaplib.IMAP4_SSL] = None
        self.last_seen_uid: Optional[int] = None
        self.last_scan_time: Optional[datetime] = None
    
    def connect(self) -> None:
        """
        Establish IMAP connection and select mailbox.
        
        Raises:
            imaplib.IMAP4.error: If connection or authentication fails
            ssl.SSLError: If SSL handshake fails
        """
        self._connection = imaplib.IMAP4_SSL(host=self.host, port=self.port)
        
        if self.username and self.password:
            self._connection.login(self.username, self.password)
        
        self._connection.select(self.mailbox)
    
    def disconnect(self) -> None:
        """Close IMAP connection gracefully."""
        if self._connection:
            try:
                self._connection.logout()
            except Exception:
                self._connection.close()
            finally:
                self._connection = None
    
    def _search_unread(self) -> List[int]:
        """
        Search for unread email UIDs.
        
        Returns:
            List of numeric UIDs for unread emails
        """
        if not self._connection:
            raise RuntimeError("Not connected. Call connect() first.")
        
        # Search for all emails since last seen UID
        if self.last_seen_uid:
            search_criteria = f'UID {self.last_seen_uid + 1}:*'
        else:
            search_criteria = 'ALL'
        
        status, message_ids = self._connection.search(None, search_criteria)
        
        if status != 'OK':
            return []
        
        # Parse message IDs
        uids = []
        if message_ids and message_ids[0]:
            for uid in message_ids[0].split():
                try:
                    uids.append(int(uid))
                except ValueError:
                    continue
        
        return sorted(uids)
    
    def _fetch_email(self, uid: int) -> Optional[Message]:
        """
        Fetch a single email by UID.
        
        Args:
            uid: Email UID to fetch
            
        Returns:
            Parsed email Message object or None if fetch fails
        """
        if not self._connection:
            raise RuntimeError("Not connected. Call connect() first.")
        
        try:
            status, msg_data = self._connection.fetch(str(uid), '(RFC822)')
            
            if status != 'OK' or not msg_data:
                return None
            
            # msg_data is like: [(b'42 (FLAGS (\\Seen))', b'...email bytes...')]
            for item in msg_data:
                if isinstance(item, tuple) and len(item) >= 2:
                    raw_email = item[1]
                    if isinstance(raw_email, bytes):
                        return email.message_from_bytes(raw_email)
            
            return None
        except Exception:
            return None
    
    def _extract_attachments(self, msg: Message) -> List[EmailAttachment]:
        """
        Extract all attachments from an email message.
        
        Args:
            msg: Email message to parse
            
        Returns:
            List of EmailAttachment objects
        """
        attachments = []
        
        if msg.is_multipart():
            for part in msg.walk():
                self._process_part(part, attachments)
        else:
            self._process_part(msg, attachments)
        
        return attachments
    
    def _process_part(self, part, attachments: List[EmailAttachment]) -> None:
        """
        Process a single email part for attachments.
        
        Args:
            part: Email part to process
            attachments: List to append found attachments to
        """
        content_disposition = part.get('Content-Disposition', '')
        
        # Only process explicit attachments, not inline
        if 'attachment' not in content_disposition:
            return
        
        filename = part.get_filename()
        if not filename:
            # Try to get filename from content-type
            filename = part.get_param('name', header='Content-Type')
        
        if not filename:
            return
        
        # Get payload (decode if necessary)
        payload = part.get_payload(decode=True)
        if payload is None:
            payload = b''
        
        if isinstance(payload, str):
            payload = payload.encode('utf-8')
        
        attachment = EmailAttachment(
            filename=filename,
            content_type=part.get_content_type(),
            payload=payload,
            content_id=part.get('Content-ID'),
            size=len(payload)
        )
        
        attachments.append(attachment)
    
    def _save_attachment(self, attachment: EmailAttachment) -> str:
        """
        Save an attachment to disk.
        
        Args:
            attachment: EmailAttachment to save
            
        Returns:
            Path to saved file
        """
        # Create safe filename
        safe_filename = os.path.basename(attachment.filename)
        
        # Handle duplicates
        filepath = os.path.join(self.attachment_dir, safe_filename)
        counter = 1
        while os.path.exists(filepath):
            name, ext = os.path.splitext(safe_filename)
            filepath = os.path.join(self.attachment_dir, f"{name}_{counter}{ext}")
            counter += 1
        
        with open(filepath, 'wb') as f:
            f.write(attachment.payload)
        
        return filepath
    
    def _parse_email(self, msg: Message, uid: int) -> Dict[str, Any]:
        """
        Parse email message into a data dictionary.
        
        Args:
            msg: Email message to parse
            uid: Email UID
            
        Returns:
            Dictionary with email data
        """
        # Extract headers
        data = {
            'uid': uid,
            'from': msg.get('From', ''),
            'to': msg.get('To', ''),
            'cc': msg.get('Cc', ''),
            'subject': msg.get('Subject', ''),
            'date': msg.get('Date', ''),
            'message_id': msg.get('Message-ID', ''),
            'content_type': msg.get_content_type(),
            'attachments': []
        }
        
        # Extract body
        body = self._get_body(msg)
        data['body'] = body
        data['body_plain'] = self._get_body_plain(msg)
        data['body_html'] = self._get_body_html(msg)
        
        # Extract attachments
        for att in self._extract_attachments(msg):
            att_data = {
                'filename': att.filename,
                'content_type': att.content_type,
                'size': att.size,
                'content_id': att.content_id
            }
            
            if self.download_attachments:
                saved_path = self._save_attachment(att)
                att_data['path'] = saved_path
                att_data['payload'] = att.payload
            else:
                att_data['payload'] = att.payload
            
            data['attachments'].append(att_data)
        
        return data
    
    def _get_body(self, msg: Message) -> str:
        """Get the body of the email."""
        body = msg.get_body()
        if body:
            return body.get_content()
        return ''
    
    def _get_body_plain(self, msg: Message) -> str:
        """Get plain text body."""
        for part in msg.walk():
            if part.get_content_type() == 'text/plain':
                payload = part.get_payload(decode=True)
                if payload:
                    if isinstance(payload, bytes):
                        return payload.decode('utf-8', errors='replace')
                    return payload
        return ''
    
    def _get_body_html(self, msg: Message) -> str:
        """Get HTML body."""
        for part in msg.walk():
            if part.get_content_type() == 'text/html':
                payload = part.get_payload(decode=True)
                if payload:
                    if isinstance(payload, bytes):
                        return payload.decode('utf-8', errors='replace')
                    return payload
        return ''
    
    def detect(self) -> List[Dict[str, Any]]:
        """
        Poll for new emails and return a list of email events.
        
        Returns:
            List of email event dictionaries
            
        Raises:
            RuntimeError: If not connected
        """
        if not self._connection:
            raise RuntimeError("Not connected. Call connect() first.")
        
        events = []
        uids = self._search_unread()
        
        for uid in uids:
            msg = self._fetch_email(uid)
            if msg:
                data = self._parse_email(msg, uid)
                
                event = EmailEvent(
                    type="email_received",
                    source="email_sensor",
                    data=data
                )
                
                events.append(event.to_dict())
                
                # Update last seen UID
                self.last_seen_uid = uid
                
                # Mark as read if configured
                if self.mark_as_read:
                    try:
                        self._connection.store(str(uid), '+FLAGS', '\\Seen')
                    except Exception:
                        pass
        
        self.last_scan_time = datetime.now(timezone.utc)
        
        return events
    
    def poll(self) -> Iterator[EmailEvent]:
        """
        Continuously poll for new emails.
        
        Yields:
            EmailEvent objects as they arrive
            
        Note:
            This is a blocking iterator. Use in a separate thread
            or with async wrapper for non-blocking behavior.
        """
        while True:
            try:
                if not self._connection:
                    self.connect()
                
                events = self.detect()
                for event in events:
                    yield event
                
            except imaplib.IMAP4.error as e:
                # Reconnect on error
                self._connection = None
                time.sleep(5)
                continue
            
            time.sleep(self.scan_interval)
    
    def reset_state(self) -> None:
        """Reset sensor state (last seen UID, scan time)."""
        self.last_seen_uid = None
        self.last_scan_time = None
    
    def __enter__(self):
        """Context manager entry."""
        self.connect()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit."""
        self.disconnect()
        return False


# Module-level convenience function
def create_email_sensor(
    host: str,
    username: str,
    password: str,
    **kwargs
) -> EmailSensor:
    """
    Factory function to create an EmailSensor with credentials.
    
    Args:
        host: IMAP server hostname
        username: Authentication username  
        password: Authentication password
        **kwargs: Additional EmailSensor parameters
        
    Returns:
        Configured EmailSensor instance
    """
    return EmailSensor(
        host=host,
        username=username,
        password=password,
        **kwargs
    )
