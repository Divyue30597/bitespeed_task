import { useCallback } from "react";
import ReactFlow, {
  Controls,
  MarkerType,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import styles from "./app.module.scss";

import Node from "./components/nodes/Nodes";
import Button from "./components/button/button";

/**
 * Nodes need to contain a position and label. id should be unique.
 */
const initialNodes = [
  {
    id: "1",
    position: { x: 500, y: 500 },
    data: { label: "Node 1" },
    type: "customNodes",
  },
  {
    id: "2",
    position: { x: 500, y: 600 },
    data: { label: "Node 2" },
    type: "customNodes",
  },
];

/**
 * An edge needs a target (node id) and a source (node id)
 */
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "example",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 10,
      height: 10,
    },
    style: {
      strokeWidth: 2,
    },
  },
];

const nodeTypes = { customNodes: Node };

export default function App() {
  // For adding interactivity to the graph
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    // @ts-ignore
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className={styles.app}>
      <div className={styles.navbar}>
        <Button type="button" className={styles.btn}>
          Save Changes
        </Button>
      </div>
      <div className={styles.container}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
        </ReactFlow>
      </div>
      <div className={styles.sidebar}>
        <h1>Sidebar</h1>
      </div>
    </div>
  );
}
