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
import useAppState from "./hooks/useAppState";

const nodeTypes = { customNodes: MessageNode };

let id = 0;
const getId = () => `node_${++id}`;

export default function App() {
  // For adding interactivity to the graph
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const reactFlowWrapper = useRef(null);
  const { value, setIsDragging } = useAppState();

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
        position: position!,
        data: { id: `node_${id}`, label: `${type} node`, value: value },
      };
      console.log(id);
      setNodes((nds) => nds.concat(newNode));
      setIsDragging(true);
    },
    [reactFlowInstance]
  );

  const updateNodeMessage = (id: string, data: string) => {
    const newNodes = nodes.map((node) => {
      if (node.id === id) {
        node.data = { ...node.data, value: data };
      }

      return node;
    });

    setNodes(newNodes);
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    // @ts-ignore
    (connection) => {
      const edge = {
        ...connection,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 15,
          height: 15,
        },
        style: {
          strokeWidth: 2,
        },
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  return (
    <ReactFlowProvider>
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
        <Sidebar id={`node_${id}`} updateNodeMessage={updateNodeMessage} />
      </div>
    </ReactFlowProvider>
  );
}
