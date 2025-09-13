import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Board } from "../types/board";

interface BoardState {
  boards: Board[] | [];
  currentBoard: Board | null;
}

const initialState: BoardState = {
  boards: [],
  currentBoard: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    },
    setCurrentBoard(state, action: PayloadAction<Board | null>) {
      state.currentBoard = action.payload;
    },
  },
});

export const { setBoards, setCurrentBoard } = boardSlice.actions;

export default boardSlice.reducer;
