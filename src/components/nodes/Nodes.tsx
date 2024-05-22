import { Handle, NodeProps, Position } from "reactflow";

import styles from "./styles.module.scss";
import whatsapp from "/whatsapp.svg";
import message from "/message.svg";

/**
 * Creating a custom node, it will take in a target and a source.
 * @returns
 */
export default function MessageNode({ data, selected }: NodeProps) {
  return (
    <div className={`${styles.node_style} ${selected ? styles.active : ""}`}>
      <div className={`${styles.header} flex_center`}>
        <div className={`${styles.sub_heading} flex_center`}>
          <img src={message} alt="Whatsapp Image" />
          <p>Send Message</p>
        </div>
        <img src={whatsapp} alt="Whatsapp Image" />
      </div>
      <div className={styles.body}>
        <p>{data}</p>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
