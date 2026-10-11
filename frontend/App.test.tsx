import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithQueryClient } from './test/renderWithQueryClient';
import App from './App';

const originalFetch = globalThis.fetch;

function mockApplicationsFetch(applications: unknown[]) {
  globalThis.fetch = jest.fn<typeof fetch>().mockResolvedValue({
    ok: true,
    json: async () => applications,
  } as Response);
}

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe('App', () => {
  it('renders the dashboard heading', () => {
    renderWithQueryClient(<App />);

    expect(
      screen.getByRole('heading', { name: /app intelligence dashboard/i }),
    ).toBeInTheDocument();
  });

  it('provides navigation to the main dashboard sections', () => {
    renderWithQueryClient(<App />);

    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Applications' })).toBeInTheDocument();
  });

  it('identifies Overview as the current page', () => {
    renderWithQueryClient(<App />);

    expect(
      screen.getByRole('link', { name: 'Overview' }),
    ).toHaveAttribute('aria-current', 'page');
  });

  it('provides header and main content landmarks', () => {
    renderWithQueryClient(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the Overview page heading', () => {
    renderWithQueryClient(<App />);

    expect(
      screen.getByRole('heading', { name: 'Overview', level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders a description of the Overview page', () => {
    renderWithQueryClient(<App />);

    expect(
      screen.getByText('Monitor your applications in one place.'),
    ).toBeInTheDocument();
  });

  it('labels the main navigation accessibly', () => {
    renderWithQueryClient(<App />);

    expect(
      screen.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeInTheDocument();
  });

  it('displays applications on the Overview page', async () => {
    mockApplicationsFetch([
      {
        id: 1,
        name: 'Payment API',
        category: 'Finance',
        publisher: 'Example Publisher',
      },
    ]);

    renderWithQueryClient(<App />);

    expect(
      await screen.findByRole('heading', { name: 'Payment API' }),
    ).toBeInTheDocument();
  });

  it('displays applications returned by the API', async () => {
    mockApplicationsFetch([
      {
        id: 1,
        name: 'Analytics App',
        category: 'Productivity',
        publisher: 'Example Publisher',
      },
    ]);

    renderWithQueryClient(<App />);

    expect(
      await screen.findByRole('heading', { name: 'Analytics App' }),
    ).toBeInTheDocument();
  });

  it('navigates to the Applications page', async () => {
    mockApplicationsFetch([]);

    renderWithQueryClient(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'Applications' }));

    expect(
      await screen.findByRole('heading', {
        name: 'Applications',
        level: 2,
      }),
    ).toBeInTheDocument();
  });

  it('filters applications by category on the Applications page', async () => {
    mockApplicationsFetch([
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
    ]);

    renderWithQueryClient(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'Applications' }));

    const categoryFilter = await screen.findByRole('combobox', {
      name: 'Filter by category',
    });

    fireEvent.change(categoryFilter, { target: { value: 'Finance' } });

    expect(screen.getByText('Payment API')).toBeInTheDocument();
    expect(screen.queryByText('Analytics App')).not.toBeInTheDocument();
  });
});
