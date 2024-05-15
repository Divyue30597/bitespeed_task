import Button from "../../components/button/button";
import styles from "./styles.module.scss";
import message from "/message.svg";

export default function Sidebar() {
  function handleOnDragStart(
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) {
    console.log(event);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <div className={styles.sidebar}>
      <div
        className={`${styles.btn_node} flex_center`}
        onDragStart={(event) => handleOnDragStart(event, "customNodes")}
        draggable
      >
        <img src={message} alt="message" />
        <p>Message</p>
      </div>
    </div>
  );
}
