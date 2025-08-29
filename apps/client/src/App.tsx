import { Outlet } from "react-router";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <Header />
      <main className="relative md:flex">
        <SideBar />
        <Outlet />
      </main>
    </>
  );
}

export default App;
