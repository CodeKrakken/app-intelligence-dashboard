import type { Application } from '../../types';
import ApplicationCard from '../ApplicationCard/ApplicationCard';

type ApplicationListProps = {
  applications: Application[];
  categoryFilter?: Application['category'];
};

function ApplicationList({
  applications,
  categoryFilter,
}: ApplicationListProps) {
  const filteredApplications = categoryFilter
    ? applications.filter(
        (application) => application.category === categoryFilter,
      )
    : applications;

  return (
    <section aria-label="Applications">
      {filteredApplications.length === 0 ? (
        <p>No applications to display.</p>
      ) : (
        filteredApplications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))
      )}
    </section>
  );
}

export default ApplicationList;