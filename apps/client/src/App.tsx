import { Outlet } from "react-router";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "./redux/hooks";
import { setBoards } from "./redux/boardSlice";
import type { Task } from "./types/task";

interface TasksContextType {
  tasks: Task[] | null;
  setTasks: React.Dispatch<React.SetStateAction<Task[] | null>>;
}
export const TasksContext = createContext<TasksContextType>(
  {} as TasksContextType,
);

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios.get("board").then((res) => dispatch(setBoards(res.data ?? [])));
  }, []);
  const [tasks, setTasks] = useState<Task[] | null>(null);

  return (
    <>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <Header />
        <main className="relative h-full flex-1 md:flex">
          <SideBar />
          <div className="flex-1 px-4 py-6 md:px-6">
            <Outlet />
          </div>
        </main>
      </TasksContext.Provider>
    </>
  );
}

export default App;
