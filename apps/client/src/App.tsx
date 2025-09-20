import { Outlet } from "react-router";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import { useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setBoards } from "./redux/boardSlice";
import { cn } from "./utils/utils";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios.get("board").then((res) => {
      if (Array.isArray(res.data)) {
        dispatch(setBoards(res.data ?? []));
      }
    });
  }, []);
  const isSideBarShown = useAppSelector((root) => root.app.isSideBarShown);
  const isSideBarMinimized = useAppSelector(
    (root) => root.app.isSideBarMinimized,
  );
  return (
    <>
      <Header />
      <main className="relative h-full flex-1 overflow-x-auto md:flex">
        <SideBar />
        <div
          className={cn(
            "min-h-[calc(100dvh-var(--spacing)*20)] flex-1 px-4 py-6 pt-20 transition-all md:min-h-[calc(100dvh-var(--spacing)*31)] md:px-6 md:pt-31 md:pl-71",
            isSideBarShown && "overflow-hidden",
            isSideBarMinimized && "!pl-6",
          )}
        >
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
