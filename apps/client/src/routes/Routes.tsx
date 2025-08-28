import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "../App.tsx";
import Error from "../components/Error.tsx";
import Board from "../pages/Board.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} errorElement={<Error />}>
      <Route index element={<Board />} />
      <Route path=":id" element={<Board />} />
    </Route>
  )
);

export default router;
