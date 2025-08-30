import { Outlet } from "react-router";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";

function App() {
  return (
    <>
      <Header />
      <main className="relative md:flex">
        <SideBar />
        <div className="flex-1 px-4 py-6 md:px-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
