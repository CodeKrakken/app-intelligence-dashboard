import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ApplicationCard from './ApplicationCard';
import type { Application } from '../../types';

const application: Application = {
  id: 1,
  name: 'Payment API',
  category: 'Finance',
  publisher: 'Example Publisher',
};

describe('ApplicationCard', () => {
  it('renders the application name', () => {
    render(<ApplicationCard application={application} />);

    expect(
      screen.getByRole('heading', { name: 'Payment API' }),
    ).toBeInTheDocument();
  });

  it('renders the application category', () => {
    render(<ApplicationCard application={application} />);

    expect(screen.getByText('Finance')).toBeInTheDocument();
  });

  it('renders the application publisher', () => {
    render(<ApplicationCard application={application} />);

    expect(screen.getByText('Example Publisher')).toBeInTheDocument();
  });

  it('renders the application as an article labelled by its heading', () => {
    render(<ApplicationCard application={application} />);

    const article = screen.getByRole('article', {
      name: 'Payment API',
    });

    expect(
      within(article).getByRole('heading', { name: 'Payment API' }),
    ).toBeInTheDocument();
  });
});