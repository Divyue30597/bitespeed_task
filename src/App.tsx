import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

const style = {
  width: "100vw",
  height: "100vh",
};

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { lable: "1" },
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { lable: "2" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
];

export default function App() {
  return (
    <div style={style}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}
