import left_arrow from "/left-arrow.svg";
import styles from "./styles.module.scss";
import message from "/message.svg";
import useAppState from "../../hooks/useAppState";
import { useReactFlow, useStoreApi } from "reactflow";

export default function Sidebar({
  id,
  updateNodeMessage,
}: {
  id: string;
  updateNodeMessage: (id: string, data: string) => void;
}) {
  // One context
  const { isDragging, setIsDragging } = useAppState();
  const store = useStoreApi();

  // const nodes = store.getState().getNodes();
  console.log(store.getState());

  function handleOnDragStart(
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <div className={styles.sidebar}>
      {!isDragging ? (
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
              onClick={() => setIsDragging(false)}
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
              onChange={(e) => {
                updateNodeMessage(id, e.target.value);
              }}
              rows={5}
            />
          </div>
        </>
      )}
    </div>
  );
}
