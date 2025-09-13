import { Outlet } from "react-router";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import { useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "./redux/hooks";
import { setBoards } from "./redux/boardSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios.get("board").then((res) => dispatch(setBoards(res.data ?? [])));
  }, []);

  return (
    <>
      <Header />
      <main className="relative h-full flex-1 md:flex">
        <SideBar />
        <div className="flex-1 px-4 py-6 md:px-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
