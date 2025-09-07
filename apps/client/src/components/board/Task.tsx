import type { Task } from "../../types/task";

const Task = ({ task }: { task: Task }) => {
  return (
    <div className="dark:bg-very-dark-grey rounded-[0.5rem] px-4 py-5.75 shadow-sm">
      <h4 className="text-heading-m">{task.title}</h4>
    </div>
  );
};

export default Task;
