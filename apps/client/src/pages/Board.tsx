import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentBoard } from "../redux/boardSlice";

const Board = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((root) => root.board.boards);
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

  return <>Board {id}</>;
};

export default Board;
