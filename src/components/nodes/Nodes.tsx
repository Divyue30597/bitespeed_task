import { Handle, Position } from "reactflow";

import styles from "./styles.module.scss";
import whatsapp from "/public/whatsapp.svg";
import message from "/public/message.svg";

/**
 * Creating a custom node, it will take in a target and a source.
 * @returns
 */

export default function Node() {
  return (
    <div className={styles.node_style}>
      <div className={`${styles.header} flex_center`}>
        <div className={`${styles.sub_heading} flex_center`}>
          <img src={message} alt="Whatsapp Image" />
          <p>Send Message</p>
        </div>
        <img src={whatsapp} alt="Whatsapp Image" />
      </div>
      <div className={styles.body}>
        <p>Sample Text</p>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
