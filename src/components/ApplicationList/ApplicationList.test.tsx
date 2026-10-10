import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Application } from '../../types';
import ApplicationList from './ApplicationList';

describe('ApplicationList', () => {
  it('renders a card for each application', () => {
    const applications: Application[] = [
      { id: 'app-1', name: 'Payment API', status: 'healthy' },
      { id: 'app-2', name: 'Customer Portal', status: 'warning' },
    ];

    render(<ApplicationList applications={applications} />);

    expect(
      screen.getByRole('heading', { name: 'Payment API' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Customer Portal' }),
    ).toBeInTheDocument();
  });

  it('displays a message when there are no applications', () => {
    render(<ApplicationList applications={[]} />);

    expect(
      screen.getByText('No applications to display.'),
    ).toBeInTheDocument();
  });

  it('displays only applications matching the selected status', () => {
    const applications: Application[] = [
      { id: 'app-1', name: 'Payment API', status: 'healthy' },
      { id: 'app-2', name: 'Customer Portal', status: 'warning' },
    ];

    render(
      <ApplicationList
        applications={applications}
        statusFilter="healthy"
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Payment API' }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: 'Customer Portal' }),
    ).not.toBeInTheDocument();
  });

  it('displays all applications when no status filter is supplied', () => {
    render(
      <ApplicationList
        applications={[
          { id: 'app-1', name: 'Payment API', status: 'healthy' },
          { id: 'app-2', name: 'Customer Portal', status: 'warning' },
          { id: 'app-3', name: 'Reporting Service', status: 'error' },
        ]}
      />,
    );

    expect(screen.getByText('Payment API')).toBeInTheDocument();
    expect(screen.getByText('Customer Portal')).toBeInTheDocument();
    expect(screen.getByText('Reporting Service')).toBeInTheDocument();
  });
  
  it('renders one article for each application', () => {
    render(
      <ApplicationList
        applications={[
          { id: 'app-1', name: 'Payment API', status: 'healthy' },
          { id: 'app-2', name: 'Customer Portal', status: 'warning' },
        ]}
      />,
    );

    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

});
