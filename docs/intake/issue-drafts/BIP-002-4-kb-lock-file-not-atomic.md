# BIP-002-4 — Lock File Acquisition Is Not Atomic

**Use Case:** BIP-002 (Knowledge Base RAG)
**Confidence:** HIGH
**Type:** correctness

## Description

The spec describes using a lock file to prevent simultaneous ingestion runs and checking if the lock is stale (PID dead or file older than 15 minutes). However, the mechanism for acquiring the lock is not described and is almost certainly not atomic, creating a race condition window between checking for the lock and creating it.

## Specific Problem

1. **Check-then-act race:** Process A checks for lock → finds none → Process B checks for lock → finds none → both processes proceed to acquire the lock → one overwrites the other → both proceed
2. **PID-based staleness check is unreliable:** PID reuse after process death means a new process with the same PID as a dead process could incorrectly find a stale lock invalid and proceed concurrently
3. **File age staleness is racy:** A process could crash after creating the lock file but before completing ingestion. If the file system has write delays or the process is swapped out, the age check could return false negatives

## Expected Behavior

Lock acquisition must be atomic. Use one of:
1. **`fcntl` (POSIX):** `fcntl(fd, F_SETLK, {F_WRLCK})` — atomic lock acquisition that fails immediately if the lock is held
2. **`flock` (BSD/macOS):** `flock(fd, LOCK_EX | LOCK_NB)` — atomic exclusive lock
3. **`mkdir` (atomic directory creation):** `mkdir(lockPath, 0444)` is atomic on POSIX systems (creating a directory is atomic, EEXIST means already held)

The PID + age staleness check should be a recovery mechanism for orphaned locks, not the primary locking mechanism.

## Source Reference

BIP-002, "Concurrency protection" section: "Use a lock file to prevent simultaneous ingestion runs. Check if lock is stale (PID dead or file older than 15 minutes)."
