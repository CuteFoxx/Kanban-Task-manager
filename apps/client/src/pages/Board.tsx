import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentBoard } from "../redux/boardSlice";
import Column from "../components/board/Column";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Task } from "../types/task";
import axios from "axios";

export const TasksContext = createContext<Task[] | null>([]);

const Board = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((root) => root.board.boards);
  const currentBoard = useAppSelector((root) => root.board.currentBoard);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (currentBoard?.id != null) {
      axios
        .get("task", {
          params: {
            board: currentBoard?.id,
          },
        })
        .then((res) => {
          if (res.data) {
            setTasks(res.data);
          }
        });
    }
  }, [currentBoard]);

  useEffect(() => {
    const currentBoard = id
      ? (boards.find((board) => board.id === +id) ?? null)
      : null;
    dispatch(setCurrentBoard(currentBoard));

    return () => {
      dispatch(setCurrentBoard(null));
    };
  }, [boards, id]);

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    const taskId = active.id as number;
    const newStatus = over.id as Task["columnId"];

    const task = await axios
      .get(`task/${taskId}`)
      .then((res) => res.data as Task);

    axios.patch(`task/${taskId}`, {
      ...task,
      columnId: newStatus,
    } as Partial<Task>);

    if (tasks != null) {
      const updatedTasks = tasks.map((task) => {
        if (task.id != taskId) {
          return task;
        }
        return Object.assign(task, { ...task, columnId: newStatus });
      });

      setTasks(updatedTasks);
    }
  };

  return (
    <TasksContext.Provider value={tasks}>
      <div className="flex gap-6">
        <DndContext onDragEnd={handleDragEnd}>
          {currentBoard?.columns?.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </DndContext>
      </div>
    </TasksContext.Provider>
  );
};

export default Board;
