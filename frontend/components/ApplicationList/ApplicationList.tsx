import type { Application } from '../../types';
import ApplicationCard from '../ApplicationCard/ApplicationCard';

type ApplicationListProps = {
  applications: Application[];
  statusFilter?: Application['status'];
};

function ApplicationList({
  applications,
  statusFilter,
}: ApplicationListProps) {
  const filteredApplications = statusFilter
    ? applications.filter(
        (application) => application.status === statusFilter,
      )
    : applications;

  return (
    <section aria-label="Applications">
      {filteredApplications.length === 0 ? (
        <p>No applications to display.</p>
      ) : (
        filteredApplications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
          />
        ))
      )}
    </section>
  );
}

export default ApplicationList;