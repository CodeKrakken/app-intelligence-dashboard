import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Application } from '../../types';
import ApplicationCard from './ApplicationCard';

describe('ApplicationCard', () => {
  it('renders the application name and status', () => {
    const application: Application = {
      id: 'app-1',
      name: 'Payment API',
      status: 'healthy',
    };

    render(<ApplicationCard application={application} />);

    expect(
      screen.getByRole('heading', { name: 'Payment API' }),
    ).toBeInTheDocument();

    expect(screen.getByText('healthy')).toBeInTheDocument();
  });
  
  it('renders the application name as a level-two heading', () => {
    render(
      <ApplicationCard
        application={{
          id: 'app-1',
          name: 'Payment API',
          status: 'healthy',
        }}
      />,
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Payment API',
      }),
    ).toBeInTheDocument();
  });

  it('exposes each application as an article named after the application', () => {
    render(
      <ApplicationCard
        application={{
          id: 'app-1',
          name: 'Payment API',
          status: 'healthy',
        }}
      />,
    );

    expect(
      screen.getByRole('article', { name: 'Payment API' }),
    ).toBeInTheDocument();
  });

  it('exposes the application status semantically', () => {
    render(
      <ApplicationCard
        application={{
          id: 'app-1',
          name: 'Payment API',
          status: 'healthy',
        }}
      />,
    );

    expect(screen.getByRole('status')).toHaveTextContent('healthy');
  });
});
