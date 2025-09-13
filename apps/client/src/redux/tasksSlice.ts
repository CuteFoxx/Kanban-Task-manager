import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../types/task";

interface TasksState {
  value: Task[] | [];
}

const initialState: TasksState = {
  value: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
