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
});