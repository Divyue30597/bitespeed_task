import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className}`}>{children}</button>
  );
}
