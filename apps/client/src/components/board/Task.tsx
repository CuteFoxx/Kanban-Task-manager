import { useDraggable } from "@dnd-kit/core";
import type { Task as TaskType } from "../../types/task";
import { Modal, ModalContent, ModalTitle, ModalTrigger } from "../Modal";
import Checkbox from "../form/Checkbox";
import type { SubTask } from "../../types/subtask";
import { useEffect, useState } from "react";
import axios from "axios";
import Select, { type Option } from "../form/Select";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OptionsModal from "../OptionsModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { setTasks } from "../../redux/tasksSlice";
import TaskForm from "./TaskForm";

const Task = ({ task }: { task: TaskType }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const currentBoard = useAppSelector((root) => root.board.currentBoard);
  const [options, setOptions] = useState<Option[]>();
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const tasks = useAppSelector((root) => root.tasks.value);
  const dispatch = useAppDispatch();

  const style =
    transform != null
      ? { transform: `translate(${transform.x}px,${transform.y}px)` }
      : undefined;

  const completedTasksCount = task?.subTasks?.filter(
    (task) => task.completed,
  )?.length;

  const handleSubTaskCLick = (clickedSubtask: SubTask) => {
    if (!tasks) return;

    const updatedTasks = tasks.map((taskItem) => {
      if (taskItem.id !== task.id) return taskItem;

      const updatedSubTasks = taskItem.subTasks.map((subTask) =>
        subTask.id === clickedSubtask.id
          ? { ...subTask, completed: !subTask.completed }
          : subTask,
      );

      return { ...taskItem, subTasks: updatedSubTasks };
    });

    dispatch(setTasks(updatedTasks));

    axios.patch(`/subtask/${clickedSubtask.id}`, {
      completed: !clickedSubtask.completed,
    });
  };

  const handleTaskColumnUpdate = (newColumndId: number) => {
    axios.patch(`/task/${task.id}`, { ...task, columnId: newColumndId });
    if (tasks != null) {
      dispatch(
        setTasks([
          ...tasks.filter((item) => item.id != task.id),
          { ...task, columnId: newColumndId },
        ]),
      );
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
        className="mb-5 last:mb-0"
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
              <button
                onClick={() => {
                  setIsUpdateTaskModalOpen((prev) => !prev);
                  setIsOpen(false);
                }}
                className="text-medium-grey cursor-pointer"
              >
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
      {isUpdateTaskModalOpen && (
        <Modal
          controls={{
            isOpen: isUpdateTaskModalOpen,
            setIsOpen: setIsUpdateTaskModalOpen,
          }}
        >
          <ModalContent>
            <TaskForm
              action="UPDATE"
              defaultValues={{
                title: task.title,
                description: task?.description ?? "",
                subtasks: task.subTasks,
                status: String(task.columnId),
              }}
              taskId={task.id}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Task;
