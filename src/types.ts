export type Application = {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'error';
};
