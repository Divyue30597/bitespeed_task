import { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Connection,
  Controls,
  ReactFlowInstance,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";

import styles from "./app.module.scss";

import MessageNode from "./components/nodes/Nodes";
import Sidebar from "./sections/Sidebar/sidebar";
import Navbar from "./sections/Navbar/navbar";
import CustomEdge from "./components/customEdges/CustomEdge";

export default function App() {
  // For adding interactivity to the graph
  const [nodes, setNodes, onNodesChange] = useNodesState(
    JSON.parse(localStorage.getItem("flow")!)?.nodes || []
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    JSON.parse(localStorage.getItem("flow")!)?.edges || []
  );
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const reactFlowWrapper = useRef(null);

  const nodeTypes = useMemo(() => ({ customNodes: MessageNode }), []);
  const edgeTypes = useMemo(() => ({ customEdge: CustomEdge }), []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("reactflow/nodeType");
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Creating a new node everytime we are dragging from the setting panel.
      const newNode = {
        id: uuidv4(),
        type: type,
        position: position!,
        data: "",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const updateNodeMessage = (data: string) => {
    const newNodes = nodes.map((node) => {
      if (node.selected) {
        node.data = data;
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
    (connection: Connection) => {
      const newEdge = { ...connection, type: "customEdge" };
      setEdges((eds) => {
        return addEdge(newEdge, eds);
      });
    },
    [setEdges]
  );

  const isValidConnection = (connection: Connection) => {
    // check if starting source already contains has an edge
    return !edges.filter((edge) => edge.source === connection.source).length;
  };

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
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            isValidConnection={isValidConnection}
            // onConnectStart={onConnectStart}
            // selectNodesOnDrag={false}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar updateNodeMessage={updateNodeMessage} />
      </div>
    </ReactFlowProvider>
  );
}
