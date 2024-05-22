import { useEffect, useRef, useState } from "react";
// Static Assets
import close_cross from "../../assets/close_cross.svg";
import tick_circle from "../../assets/tick_circle.svg";
import danger from "../../assets/warning.svg";
import warning from "../../assets/alert-circle.svg";

import styles from "./alert.module.scss";
import { useMountTransition } from "../../hooks/useMountTransition";

interface AlertProps {
  // isVisible: boolean;
  message: string;
  className?: string;
  image?: string;
  timer?: number;
  position?:
    | "bottom_left"
    | "bottom_right"
    | "top_right"
    | "top_left"
    | "top_center"
    | "bottom_center"
    | string;
  type?: "success" | "warning" | "danger" | "default" | string;
}

function Alert({
  className = "",
  image = tick_circle,
  message = "Default timer is 1500ms",
  timer = 1500,
  position = "bottom_right",
  type = "default",
  ...props
}: AlertProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const hasTransitionedIn = useMountTransition(visible, 200);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, timer);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible, timer]);

  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);

  const handleClick = () => {
    setVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  switch (type) {
    case "success":
      image = tick_circle;
      break;
    case "warning":
      image = warning;
      break;
    case "danger":
      image = danger;
      break;
    default:
      image = image;
      message = message;
      break;
  }

  return (
    (visible || hasTransitionedIn) && (
      <div
        className={`${styles.alert} ${styles[position]} ${
          visible ? styles[`show_${position}`] : styles[`hide_${position}`]
        }`}
      >
        <div
          className={`${styles.alert_body} ${styles[type]} ${className}`}
          {...props}
        >
          <button onClick={() => handleClick()} className={styles.close_button}>
            <img src={close_cross} alt="close button" />
          </button>
          <img src={image} alt="some image" />
          <div className={styles.alert_inner_body}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    )
  );
}

export default Alert;
