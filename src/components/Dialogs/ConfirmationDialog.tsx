import { MouseEventHandler } from "react";
import styles from "./Dialogs.module.scss";

interface DialogProps {
  message: string;
  icon: string;
  buttonText: string;
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

const ConfirmationDialog = ({
  message,
  icon,
  buttonText,
  onButtonClick,
  onClose,
}: DialogProps) => {
  return (
    <div className={styles.container}>
      <img src={icon} className={styles["action-icon"]} alt="delete" />
      <h2>{message}</h2>
      <div className={styles["action-btns"]}>
        <button className={styles["action-btn"]} onClick={onButtonClick}>
          {buttonText}
        </button>
        <button onClick={onClose} className={styles["action-btn"]}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
