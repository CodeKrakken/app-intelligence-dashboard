import ApplicationList from './components/ApplicationList';
import type { Application } from './types';

const applications: Application[] = [
  { id: 'app-1', name: 'Payment API', status: 'healthy' },
  { id: 'app-2', name: 'Customer Portal', status: 'warning' },
];

function App() {
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
        <ApplicationList applications={applications} />
      </main>
    </>
  );
}

export default App;