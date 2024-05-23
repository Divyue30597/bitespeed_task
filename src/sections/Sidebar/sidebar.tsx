import left_arrow from "/left-arrow.svg";
import styles from "./styles.module.scss";
import message from "/message.svg";
import { useNodes } from "reactflow";
import { useEffect, useState } from "react";

export default function Sidebar({
  updateNodeMessage,
}: {
  updateNodeMessage: (data: string) => void;
}) {
  const node = useNodes().filter((node) => {
    return node.selected;
  });
  const [isSelected, setIsSelected] = useState(node[0]?.selected);
  const [inputVal, setInputVal] = useState(node[0]?.data as string);

  useEffect(() => {
    if (node.length) {
      setIsSelected(node[0]?.selected!);
      setInputVal(node[0]?.data as string);
    } else {
      setIsSelected(false);
    }
  }, [node]);

  function handleOnDragStart(
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) {
    event.dataTransfer.setData("reactflow/nodeType", nodeType);
    event.dataTransfer.effectAllowed = "move";
    setInputVal("");
  }

  return (
    <div className={styles.sidebar}>
      {!isSelected ? (
        <div
          className={`${styles.btn_node} flex_center`}
          onDragStart={(event) => handleOnDragStart(event, "customNodes")}
          draggable
        >
          <img src={message} alt="message" />
          <p>Message</p>
        </div>
      ) : (
        <>
          <div className={`${styles.header} flex_center`}>
            <button
              className="flex_center"
              onClick={() => {
                setIsSelected(false);
              }}
            >
              <img src={left_arrow} alt="Left Arrow" />
            </button>
            <p>Message</p>
          </div>
          <div className={`${styles.input} flex_center`}>
            <label htmlFor="message">Text</label>
            <textarea
              name="message"
              id="message"
              placeholder="Enter Message..."
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                updateNodeMessage(e.target.value);
              }}
              rows={5}
            />
          </div>
        </>
      )}
    </div>
  );
}
