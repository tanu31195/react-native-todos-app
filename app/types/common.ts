export type Task = {
  id: string;
  title: string;
  description?: string;
  order: number;
  status: 'to do' | 'in progress' | 'done';
}
