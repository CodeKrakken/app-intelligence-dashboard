import type { Application } from '../types';

export async function fetchApplications(): Promise<Application[]> {
  const response = await fetch('/api/apps');

  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }

  return response.json();
}
