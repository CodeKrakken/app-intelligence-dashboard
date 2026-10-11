import { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchApplications } from './api/applications';
import ApplicationList from './components/ApplicationList/ApplicationList';

function Navigation() {
  const location = useLocation();

  return (
    <nav aria-label="Main navigation">
      <Link
        to="/"
        aria-current={location.pathname === '/' ? 'page' : undefined}
      >
        Overview
      </Link>
      <Link
        to="/applications"
        aria-current={
          location.pathname === '/applications' ? 'page' : undefined
        }
      >
        Applications
      </Link>
    </nav>
  );
}

function useApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
  });
}

function OverviewPage() {
  const {
    data: applications = [],
    isPending,
    isError,
  } = useApplications();

  return (
    <>
      <h2>Overview</h2>
      <p>Monitor your applications in one place.</p>
      {isPending && <p>Loading applications...</p>}
      {isError && <p role="alert">Failed to load applications.</p>}
      {!isPending && !isError && (
        <ApplicationList applications={applications} />
      )}
    </>
  );
}

function ApplicationsPage() {
  const {
    data: applications = [],
    isPending,
    isError,
  } = useApplications();
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = [...new Set(applications.map((app) => app.category))]
    .sort();

  return (
    <>
      <h2>Applications</h2>

      {isPending && <p>Loading applications...</p>}
      {isError && <p role="alert">Failed to load applications.</p>}

      {!isPending && !isError && (
        <>
          <label htmlFor="category-filter">Filter by category</label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <ApplicationList
            applications={applications}
            categoryFilter={categoryFilter || undefined}
          />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <>
      <header>
        <h1>App Intelligence Dashboard</h1>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;