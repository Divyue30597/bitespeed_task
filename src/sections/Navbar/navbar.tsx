import styles from "./styles.module.scss";
import Button from "../../components/button/button";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Button type="button" className={styles.btn}>
        Save Changes
      </Button>
    </div>
  );
}
