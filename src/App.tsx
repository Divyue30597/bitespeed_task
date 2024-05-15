import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  MarkerType,
  ReactFlowInstance,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import styles from "./app.module.scss";

import MessageNode from "./components/nodes/Nodes";
import Sidebar from "./sections/Sidebar/sidebar";
import Navbar from "./sections/Navbar/navbar";

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

const nodeTypes = { customNodes: MessageNode };

let id = 0;
const getId = () => `node_${id++}`;

export default function App() {
  // For adding interactivity to the graph
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const reactFlowWrapper = useRef(null);

  const onConnect = useCallback(
    // @ts-ignore
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  console.log(edges);

  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.container} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Controls />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
}
