import { useParams } from "react-router";

const Board = () => {
  const params = useParams();

  return <div>Board {params.id}</div>;
};

export default Board;
