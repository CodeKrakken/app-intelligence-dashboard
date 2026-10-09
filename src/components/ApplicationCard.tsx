import type { Application } from '../types';

type ApplicationCardProps = {
  application: Application;
};

function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <article>
      <h2>{application.name}</h2>
      <p>{application.status}</p>
    </article>
  );
}

export default ApplicationCard;
