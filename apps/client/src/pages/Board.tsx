import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentBoard } from "../redux/boardSlice";
import Column from "../components/board/Column";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Task } from "../types/task";
import axios from "axios";
import Button from "../components/form/Button";
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from "../components/Modal";
import AddColumnForm from "../components/board/AddColumnForm";
import { setTasks } from "../redux/tasksSlice";
import { cn } from "../utils/utils";

const Board = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((root) => root.board.boards);
  const currentBoard = useAppSelector((root) => root.board.currentBoard);
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);
  const tirggerButtonRef = useRef(null);
  const { id } = useParams();
  const tasks = useAppSelector((root) => root.tasks.value);

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
            dispatch(setTasks(res.data));
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
    const draggedTask = tasks?.find((item) => item.id == taskId);

    if (draggedTask?.columnId == newStatus) {
      return;
    }

    const task = await axios
      .get(`task/${taskId}`)
      .then((res) => res.data as Task);

    axios.patch(`task/${taskId}`, {
      ...task,
      columnId: newStatus,
    } as Partial<Task>);

    if (tasks != null) {
      const updatedTasks = tasks.filter((task) => taskId != task.id);
      dispatch(setTasks([...updatedTasks, { ...task, columnId: newStatus }]));
    }
  };

  if (
    currentBoard == null ||
    (currentBoard.columns != null && currentBoard.columns.length <= 0)
  ) {
    return (
      <>
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center",
          )}
        >
          <h2 className="text-medium-grey text-heading-l px-40 text-center">
            This board is empty. Create a new column to get started.
          </h2>
          <Button
            ref={tirggerButtonRef}
            onClick={() => setIsAddColumnOpen(true)}
            className="w-fit rounded-full px-6 py-3"
          >
            + Add New Column
          </Button>
        </div>
        <Modal
          controls={{ isOpen: isAddColumnOpen, setIsOpen: setIsAddColumnOpen }}
          triggerElement={tirggerButtonRef}
        >
          <ModalContent>
            <ModalTitle>Add new column</ModalTitle>
            <AddColumnForm />
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <div className="flex h-full gap-6">
      <DndContext onDragEnd={handleDragEnd}>
        {currentBoard?.columns?.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </DndContext>
      <Modal className="min-w-70">
        <ModalTrigger className="dark:bg-very-dark-grey/9 !text-medium-grey text-heading-xl hover:!text-main flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-[0.375rem] bg-[#E9EFFA]/30 transition-all">
          <button>+ New Column</button>
        </ModalTrigger>
        <ModalContent>
          <ModalTitle>Add new column</ModalTitle>
          <AddColumnForm />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Board;
