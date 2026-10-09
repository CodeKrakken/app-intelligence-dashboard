import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the dashboard heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /app intelligence dashboard/i }),
    ).toBeInTheDocument();
  });

  it('provides navigation to the main dashboard sections', () => {
    render(<App />);

    expect(
      screen.getByRole('link', { name: 'Overview' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Applications' }),
    ).toBeInTheDocument();
  });

  it('identifies Overview as the current page', () => {
    render(<App />);

    expect(
      screen.getByRole('link', { name: 'Overview' }),
    ).toHaveAttribute('aria-current', 'page');
  });

  it('provides header and main content landmarks', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the Overview page heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Overview', level: 2 }),
    ).toBeInTheDocument();
  });
});