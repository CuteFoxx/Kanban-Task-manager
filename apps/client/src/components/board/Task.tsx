import { useDraggable } from "@dnd-kit/core";
import type { Task as TaskType } from "../../types/task";

const Task = ({ task }: { task: TaskType }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style =
    transform != null
      ? { transform: `translate(${transform.x}px,${transform.y}px)` }
      : undefined;

  console.log(task);
  console.log(task.id);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="dark:bg-very-dark-grey rounded-[0.5rem] px-4 py-5.75 shadow-sm"
    >
      <h4 className="text-heading-m">{task.title}</h4>
      {task.subTasks && task.subTasks.length != 0 && (
        <span className="text-medium-grey text-heading-s">
          {(task.subTasks?.filter((task) => task.completed)).length} of{" "}
          {task.subTasks?.length} subtasks
        </span>
      )}
    </div>
  );
};

export default Task;
