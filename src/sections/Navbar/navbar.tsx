import { v4 as uuidv4 } from "uuid";

import styles from "./styles.module.scss";
import Button from "../../components/button/button";
import { useEdges, useNodes, useReactFlow } from "reactflow";
import { useEffect, useState } from "react";
import Alert from "../../components/alert/alert";

type TNoEdgeMessage = {
  status: boolean;
  type: string;
  message: string;
};

export default function Navbar() {
  const nodes = useNodes();
  const edges = useEdges();
  const reactFlow = useReactFlow();
  const [noEdgeMessage, setNoEdgeMessage] = useState<TNoEdgeMessage>({
    status: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (noEdgeMessage.status) {
        setNoEdgeMessage((prevVal) => ({
          ...prevVal,
          status: true,
          type: "",
          message: "",
        }));
      }
    }, 4500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [noEdgeMessage]);

  const handleOnClick = () => {
    if (!nodes.length && !edges.length) {
      setNoEdgeMessage((prevVal) => ({
        ...prevVal,
        status: true,
        type: "warning",
        message: "Add nodes and edges to create a flow",
      }));
    } else if (!edges.length) {
      setNoEdgeMessage((prevVal) => ({
        ...prevVal,
        status: true,
        type: "warning",
        message: "No edges present! So you cannot save the flow!",
      }));
    } else {
      const connectedNodes = nodes.filter((node) =>
        edges.some((edge) => edge.source === node.id || edge.target === node.id)
      );

      if (connectedNodes.length !== nodes.length) {
        setNoEdgeMessage((prevVal) => ({
          ...prevVal,
          status: true,
          type: "danger",
          message:
            "You cannot save the flow since one of the nodes is not connected.",
        }));
      } else {
        setNoEdgeMessage((prevVal) => ({
          ...prevVal,
          status: true,
          type: "success",
          message: "Your flow is saved in this browser's localStorage.",
        }));
        localStorage.setItem("flow", JSON.stringify(reactFlow.toObject()));
      }
    }
  };

  return (
    <div className={styles.navbar}>
      {noEdgeMessage.status && (
        <Alert
          position="top_center"
          timer={4000}
          type={noEdgeMessage.type}
          message={noEdgeMessage.message}
        />
      )}
      <Button type="button" className={styles.btn} onClick={handleOnClick}>
        Save Changes
      </Button>
    </div>
  );
}
