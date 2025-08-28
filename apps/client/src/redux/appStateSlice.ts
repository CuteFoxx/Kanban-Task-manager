import { createSlice } from "@reduxjs/toolkit";
import type { theme } from "../types/theme";

interface UserState {
  theme?: theme | null;
  isSideBarShown: boolean;
}

const initialState: UserState = {
  theme: localStorage.getItem("theme") as theme,
  isSideBarShown: false,
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
  },
});

export const { setTheme, setIsSideBarShown } = appStateSlice.actions;

export default appStateSlice.reducer;
