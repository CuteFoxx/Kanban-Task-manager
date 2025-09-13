import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "./appStateSlice";
import boardReducer from "./boardSlice";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
  reducer: {
    app: appStateReducer,
    board: boardReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
