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

function OverviewPage() {
  const {
    data: applications = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
  });

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
  } = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
  });

  return (
    <>
      <h2>Applications</h2>
      {isPending && <p>Loading applications...</p>}
      {isError && <p role="alert">Failed to load applications.</p>}
      {!isPending && !isError && (
        <ApplicationList applications={applications} />
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