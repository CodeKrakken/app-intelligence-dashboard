import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Application } from '../types';
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
});
