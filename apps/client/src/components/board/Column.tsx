import { createContext, useEffect, useState } from "react";
import { type Column as ColumnType } from "../../types/column";
import type { Task as TaskType } from "../../types/task";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";
import { useAppSelector } from "../../redux/hooks";
export const TaskContext = createContext<TaskType | null>({} as TaskType);

const Column = ({ column }: { column: ColumnType }) => {
  const [filteredTasks, setFilteredTasks] = useState<TaskType[] | null>(null);
  const { setNodeRef } = useDroppable({ id: column.id });
  const tasks = useAppSelector((root) => root.tasks.value);

  useEffect(() => {
    const filtered = tasks?.filter((task) => task.columnId === column.id);

    if (filtered != null) {
      setFilteredTasks(filtered);
    }
  }, [tasks]);

  return (
    <div
      ref={setNodeRef}
      className="column group min-w-70 [&:nth-child(2n)>h3]:before:bg-[#8471F2] [&:nth-child(3n)>h3]:before:bg-[#67E2AE]"
      key={column.id}
    >
      <h3 className="text-heading-s text-medium-grey mb-6 flex gap-3 uppercase before:block before:h-3.75 before:w-3.75 before:rounded-full before:bg-[#49C4E5] before:content-['']">
        {column.name}
        <span>({tasks?.length})</span>
      </h3>
      <div className="">
        {filteredTasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
