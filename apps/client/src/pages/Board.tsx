import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentBoard } from "../redux/boardSlice";
import Column from "../components/board/Column";

const Board = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((root) => root.board.boards);
  const currentBoard = useAppSelector((root) => root.board.currentBoard);
  const { id } = useParams();

  useEffect(() => {
    const currentBoard = id
      ? (boards.find((board) => board.id === +id) ?? null)
      : null;
    dispatch(setCurrentBoard(currentBoard));

    return () => {
      dispatch(setCurrentBoard(null));
    };
  }, [boards, id]);

  return (
    <div className="flex gap-6">
      {currentBoard?.columns?.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default Board;
