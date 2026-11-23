export interface Todo {
  id: string;
  name: string;
  notes?: string;
  subtodos?: Todo[];
}
