import { useDraggable } from "@dnd-kit/core";
import type { Task as TaskType } from "../../types/task";
import { Modal, ModalContent, ModalTitle, ModalTrigger } from "../Modal";
import Checkbox from "../form/Checkbox";
import type { SubTask } from "../../types/subtask";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Select, { type Option } from "../form/Select";
import { useAppSelector } from "../../redux/hooks";
import OptionsModal from "../OptionsModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { TasksContext } from "../../App";

const Task = ({ task }: { task: TaskType }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const { tasks, setTasks } = useContext(TasksContext);
  const currentBoard = useAppSelector((root) => root.board.currentBoard);
  const [options, setOptions] = useState<Option[]>();
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const style =
    transform != null
      ? { transform: `translate(${transform.x}px,${transform.y}px)` }
      : undefined;

  const completedTasksCount = task?.subTasks?.filter(
    (task) => task.completed,
  )?.length;

  const handleSubTaskCLick = (subtask: SubTask) => {
    subtask.completed = !subtask.completed;

    if (tasks != null && setTasks != null) {
      setTasks([...tasks.filter((item) => item.id != task.id), task]);
      axios.patch(`/subtask/${subtask.id}`, subtask);
    }
  };

  const handleTaskColumnUpdate = (newColumndId: number) => {
    task.columnId = newColumndId;
    axios.patch(`/task/${task.id}`, task);
    if (tasks != null) {
      setTasks([...tasks.filter((item) => item.id != task.id), task]);
    }
  };

  useEffect(() => {
    if (currentBoard?.columns != null) {
      const options: { label: string; value: string }[] =
        currentBoard.columns?.map((item) => {
          return { label: item.name, value: String(item.id) };
        });
      setOptions(options);
    }
  }, [currentBoard]);

  return (
    <>
      <Modal
        controls={{
          isOpen,
          setIsOpen,
        }}
      >
        <ModalTrigger>
          <div
            style={style}
            className="dark:bg-very-dark-grey [&:hover_h4]:text-main z-30 grid cursor-pointer grid-cols-[1fr_6fr] items-center rounded-[0.5rem] px-4 py-5.75 shadow-sm"
          >
            <div
              ref={setNodeRef}
              {...listeners}
              {...attributes}
              className="flex h-full cursor-grab flex-col justify-center text-left focus-within:cursor-grabbing"
            >
              ⠿
            </div>
            <div>
              <h4 className="text-heading-m transition-all">{task.title}</h4>
              {task.subTasks && task.subTasks.length != 0 && (
                <span className="text-medium-grey text-heading-s">
                  {completedTasksCount} of {task.subTasks?.length} subtasks
                </span>
              )}
            </div>
          </div>
        </ModalTrigger>
        <ModalContent>
          <ModalTitle className="flex items-center justify-between">
            {task.title}
            <OptionsModal>
              <button className="text-medium-grey cursor-pointer">
                Edit task
              </button>
              <button
                onClick={() => {
                  setIsDeleteTaskModalOpen((prev) => !prev);
                  setIsOpen(false);
                }}
                className="text-red cursor-pointer"
              >
                Delete task
              </button>
            </OptionsModal>
          </ModalTitle>
          <div className="flex flex-col gap-6">
            <p className="text-medium-grey text-medium">{task.description}</p>
            <div>
              {(task.subTasks?.length ?? 0) != 0 && (
                <>
                  <h3 className="text-medium-grey text-heading-s mb-4 dark:text-white">
                    Subtasks ({completedTasksCount} of {task.subTasks.length})
                  </h3>
                  <div className="mb-6 flex flex-col gap-2">
                    {task.subTasks.map((subtask) => (
                      <div
                        key={subtask.id}
                        className="bg-lines-grey dark:bg-very-dark-grey group hover:bg-main/30 flex cursor-pointer gap-4 rounded-[0.25rem] p-3 transition-all"
                      >
                        <Checkbox
                          id={`subtask-${subtask.id}`}
                          defaultChecked={subtask.completed}
                          onChange={() => handleSubTaskCLick(subtask)}
                        />
                        <label
                          className="group-has-[>:checked]:text-medium-grey text-heading-s w-full cursor-pointer text-black group-has-[>:checked]:line-through dark:text-white"
                          htmlFor={`subtask-${subtask.id}`}
                        >
                          {subtask.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {options && (
                <div>
                  <h3 className="text-medium-grey text-heading-s mb-4 dark:text-white">
                    Current Status
                  </h3>
                  <Select
                    onChange={(id) =>
                      handleTaskColumnUpdate(parseInt(id ?? ""))
                    }
                    options={options}
                    value={String(task.columnId)}
                  />
                </div>
              )}
            </div>
          </div>
        </ModalContent>
      </Modal>
      {isDeleteTaskModalOpen && (
        <DeleteTaskModal
          isOpen={isDeleteTaskModalOpen}
          setIsOpen={setIsDeleteTaskModalOpen}
          task={task}
        />
      )}
    </>
  );
};

export default Task;
