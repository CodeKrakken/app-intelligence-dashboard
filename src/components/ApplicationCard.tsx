import type { Application } from '../types';

type ApplicationCardProps = {
  application: Application;
};

function ApplicationCard({ application }: ApplicationCardProps) {
  const headingId = `application-${application.id}-heading`;

  return (
    <article aria-labelledby={headingId}>
      <h2 id={headingId}>{application.name}</h2>
      <p role="status">{application.status}</p>
    </article>
  );
}

export default ApplicationCard;
