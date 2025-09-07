import { useEffect, useState } from "react";
import { type Column as ColumnType } from "../../types/column";
import type { Task as TaskType } from "../../types/task";
import axios from "axios";
import Task from "./Task";

const Column = ({ column }: { column: ColumnType }) => {
  const [tasks, setTasks] = useState<TaskType[] | null>(null);
  useEffect(() => {
    axios
      .get("task", {
        params: {
          column: column.id,
        },
      })
      .then((res) => {
        if (res.data != null) {
          setTasks(res.data);
        }
      });
  }, []);

  return (
    <div className="min-w-70">
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
