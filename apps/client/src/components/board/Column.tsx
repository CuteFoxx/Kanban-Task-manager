import { useContext, useEffect, useState } from "react";
import { type Column as ColumnType } from "../../types/column";
import type { Task as TaskType } from "../../types/task";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";
import { TasksContext } from "../../pages/Board";

const Column = ({ column }: { column: ColumnType }) => {
  const [tasks, setTasks] = useState<TaskType[] | null>(null);
  const { setNodeRef } = useDroppable({ id: column.id });
  const tasksData = useContext(TasksContext);

  useEffect(() => {
    const filteredTasks = tasksData?.filter(
      (task) => task.columnId === column.id,
    );

    if (filteredTasks != null) {
      setTasks(filteredTasks);
    }
  }, [tasksData]);

  return (
    <div ref={setNodeRef} className="column min-w-70" key={column.id}>
      <h3 className="text-heading-s text-medium-grey mb-6 uppercase">
        {column.name}
      </h3>
      <div className="flex flex-col gap-5">
        {tasks?.map((task) => (
          <Task task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
