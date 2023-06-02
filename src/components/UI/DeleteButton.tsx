import { useState } from "react";
import { Car } from "../../models/Car.model";
import { removeCar } from "../../services/Cars.services";
import Modal from "../Modal/Modal";
import styles from "./DeleteButton.module.scss";
import ConfirmationDialog from "../Dialogs/ConfirmationDialog";
import deleteIcon from "../../assets/icons/delete.png";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface DeleteButtonProps {
  car: Car;
  fetchCars?: any;
}

const DeleteButton = ({ car, fetchCars }: DeleteButtonProps) => {
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);
  const message = `Are you sure you want to delete ${car.manufacturer} ${car.model}?`;
  const buttonText = "Delete";
  const navigate = useNavigate();
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const deleteCar = () => {
    removeCar(car.id);
    toast.success(
      `Car ${car.manufacturer} ${car.model} has been successfully deleted`
    );
    setIsDeleteDialogOpened(false);
    if (!isHomepage) {
      navigate("/");
    }
    if (isHomepage) {
      fetchCars();
    }
  };

  const onCloseDeleteDialog = () => {
    setIsDeleteDialogOpened(false);
  };

  return (
    <>
      <button
        className={styles["action-btn"]}
        onClick={() => setIsDeleteDialogOpened(true)}
      >
        Delete
      </button>
      {isDeleteDialogOpened && (
        <Modal onClose={() => setIsDeleteDialogOpened(false)}>
          <ConfirmationDialog
            message={message}
            onClose={onCloseDeleteDialog}
            onButtonClick={deleteCar}
            buttonText={buttonText}
            icon={deleteIcon}
          />
        </Modal>
      )}
    </>
  );
};

export default DeleteButton;
