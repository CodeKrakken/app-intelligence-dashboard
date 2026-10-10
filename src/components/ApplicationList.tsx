import type { Application } from '../types';
import ApplicationCard from './ApplicationCard';

type ApplicationListProps = {
  applications: Application[];
};

function ApplicationList({ applications }: ApplicationListProps) {
  return (
    <section aria-label="Applications">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </section>
  );
}

export default ApplicationList;
