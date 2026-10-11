import { useQuery } from '@tanstack/react-query';
import { fetchApplications } from './api/applications';
import ApplicationList from './components/ApplicationList/ApplicationList';

function App() {
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
      <header>
        <h1>App Intelligence Dashboard</h1>

        <nav aria-label="Main navigation">
          <a href="/" aria-current="page">Overview</a>
          <a href="/applications">Applications</a>
        </nav>
      </header>

      <main>
        <h2>Overview</h2>
        <p>Monitor your applications in one place.</p>

        {isPending && <p>Loading applications...</p>}
        {isError && <p role="alert">Failed to load applications.</p>}

        {!isPending && !isError && (
          <ApplicationList applications={applications} />
        )}
      </main>
    </>
  );
}

export default App;
