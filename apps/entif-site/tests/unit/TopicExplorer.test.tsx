import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TopicExplorer } from '../../src/components/TopicExplorer';
import type { ContentCardData } from '../../src/lib/content';

const cards: readonly ContentCardData[] = [
  {
    id: 'entif.research.memory',
    href: '/research/memory/',
    title: 'Memory research',
    description: 'Research about durable agentic memory and provenance.',
    kind: 'research',
    tags: ['memory', 'agentic-systems'],
    projects: ['rosetta'],
  },
  {
    id: 'entif.research.semantic',
    href: '/research/semantic/',
    title: 'Semantic research',
    description: 'Research about machine-readable semantic representation.',
    kind: 'research',
    tags: ['semantic-representation'],
    projects: ['rosetta'],
  },
];

describe('TopicExplorer', () => {
  it('shows all cards initially', () => {
    render(<TopicExplorer cards={cards} />);
    expect(screen.getByText('2 results')).toBeTruthy();
    expect(screen.getByText('Memory research')).toBeTruthy();
    expect(screen.getByText('Semantic research')).toBeTruthy();
    expect(
      screen.getByRole('button', { name: 'All' }).getAttribute('aria-pressed')
    ).toBe('true');
  });

  it('filters to a selected topic and exposes pressed state', async () => {
    const user = userEvent.setup();
    render(<TopicExplorer cards={cards} />);

    const filter = screen.getByRole('button', { name: 'memory' });
    await user.click(filter);

    expect(filter.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByText('1 result')).toBeTruthy();
    expect(screen.getByText('Memory research')).toBeTruthy();
    expect(screen.queryByText('Semantic research')).toBeNull();
  });

  it('can reset a topic filter to all results', async () => {
    const user = userEvent.setup();
    render(<TopicExplorer cards={cards} />);

    await user.click(screen.getByRole('button', { name: 'memory' }));
    await user.click(screen.getByRole('button', { name: 'All' }));

    expect(screen.getByText('2 results')).toBeTruthy();
  });

  it('renders an explicit empty state for an empty published corpus', () => {
    render(<TopicExplorer cards={[]} />);
    expect(screen.getByText('0 results')).toBeTruthy();
    expect(
      screen.getByText('No published work matches this topic yet.')
    ).toBeTruthy();
  });
});
