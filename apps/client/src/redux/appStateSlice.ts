import { createSlice } from "@reduxjs/toolkit";
import type { theme } from "../types/theme";

interface UserState {
  theme?: theme | null;
  isSideBarShown: boolean;
  isSideBarMinimized: boolean;
}

const initialState: UserState = {
  theme: localStorage.getItem("theme") as theme,
  isSideBarShown: false,
  isSideBarMinimized: JSON.parse(
    localStorage.getItem("isSideBarMinimized") ?? "false",
  ) as boolean,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    setIsSideBarShown: (state, action) => {
      state.isSideBarShown = action.payload as boolean;
    },
    setIsSideBarMinimized: (state, action) => {
      state.isSideBarMinimized = action.payload as boolean;
      localStorage.setItem(
        "isSideBarMinimized",
        JSON.stringify(action.payload),
      );
    },
  },
});

export const { setTheme, setIsSideBarShown, setIsSideBarMinimized } =
  appStateSlice.actions;

export default appStateSlice.reducer;
