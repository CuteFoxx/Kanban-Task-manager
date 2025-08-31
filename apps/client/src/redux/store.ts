import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "./appStateSlice";
import boardReducer from "./boardSlice";
export const store = configureStore({
  reducer: {
    app: appStateReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
