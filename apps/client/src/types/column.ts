import type { Task } from "./task";

export interface Column {
  id: number;
  name: string;
  tasks?: Task[];
}
