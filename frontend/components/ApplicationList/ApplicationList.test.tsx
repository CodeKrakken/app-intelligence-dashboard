import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ApplicationList from './ApplicationList';
import type { Application } from '../../types';

const applications: Application[] = [
  {
    id: 1,
    name: 'Payment API',
    category: 'Finance',
    publisher: 'Example Publisher',
  },
  {
    id: 2,
    name: 'Analytics App',
    category: 'Analytics',
    publisher: 'Data Company',
  },
];

describe('ApplicationList', () => {
  it('renders a card for each application', () => {
    render(<ApplicationList applications={applications} />);

    expect(screen.getByText('Payment API')).toBeInTheDocument();
    expect(screen.getByText('Analytics App')).toBeInTheDocument();
  });

  it('displays a message when there are no applications', () => {
    render(<ApplicationList applications={[]} />);

    expect(screen.getByText('No applications to display.')).toBeInTheDocument();
  });

  it('renders all applications when no category filter is supplied', () => {
    render(<ApplicationList applications={applications} />);

    expect(screen.getByText('Payment API')).toBeInTheDocument();
    expect(screen.getByText('Analytics App')).toBeInTheDocument();
  });

  it('renders each application as an article', () => {
    render(<ApplicationList applications={applications} />);

    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('provides an accessible name for the applications section', () => {
    render(<ApplicationList applications={applications} />);

    expect(
      screen.getByRole('region', { name: 'Applications' }),
    ).toBeInTheDocument();
  });

  it('does not mutate the applications array', () => {
    const originalApplications = [...applications];

    render(<ApplicationList applications={applications} />);

    expect(applications).toEqual(originalApplications);
  });

  it('filters applications by category when a category filter is supplied', () => {
    render(
      <ApplicationList
        applications={applications}
        categoryFilter="Finance"
      />,
    );

    expect(screen.getByText('Payment API')).toBeInTheDocument();
    expect(screen.queryByText('Analytics App')).not.toBeInTheDocument();
  });
});