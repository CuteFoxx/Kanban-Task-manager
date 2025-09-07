import type { SubTask } from "./subtask";

export interface Task {
  id: number;
  title: string;
  description?: string;
  columnId: number;
  subTasks: SubTask[];
}
