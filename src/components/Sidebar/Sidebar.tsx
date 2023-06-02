import { NavLink, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";
import FormCreateCar from "../FormCreateCar/FormCreateCar";
import Modal from "../Modal/Modal";
import styles from "./Sidebar.module.scss";
import addIcon from "../../assets/icons/add.png";
import homeIcon from "../../assets/icons/home.png";
import logoutIcon from "../../assets/icons/logout.png";
import ConfirmationDialog from "../Dialogs/ConfirmationDialog";
import { toast } from "react-toastify";

interface SidebarProps {
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  fetchCars: any;
}

const Sidebar = ({ setAccessToken, fetchCars }: SidebarProps) => {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const message = `Are you sure you want to logout?`;
  const buttonText = "Logout";
  const user = localStorage.getItem("user");
  const navigateTo = useNavigate();

  const handleLogout = () => {
    setAccessToken("");
    toast.success(`Goodbye ${user}`);
    localStorage.clear();
    navigateTo("login");
  };

  return (
    <nav className={styles["sidebar-container"]}>
      <div className={styles["nav-item"]}>
        <NavLink title="Home" to={"/"}>
          <img src={homeIcon} alt="home" />
        </NavLink>
      </div>
      <div className={styles["nav-item"]}>
        <button
          title="Add New Car"
          className={styles["create-car-button"]}
          onClick={() => setIsFormOpened(!isFormOpened)}
        >
          <img src={addIcon} alt="create-car" />
        </button>
      </div>
      {isFormOpened && (
        <Modal onClose={() => setIsFormOpened(false)}>
          <FormCreateCar fetchCars={fetchCars} />
        </Modal>
      )}
      <div className={styles["nav-item"]}>
        <button
          className={styles["logout-btn"]}
          type="button"
          title="Logout"
          onClick={() => setIsDialogOpened(true)}
        >
          <img src={logoutIcon} alt="logout" />
        </button>
      </div>
      {isDialogOpened && (
        <Modal onClose={() => setIsDialogOpened(false)}>
          <ConfirmationDialog
            message={message}
            buttonText={buttonText}
            onButtonClick={handleLogout}
            onClose={() => setIsDialogOpened(false)}
            icon={logoutIcon}
          />
        </Modal>
      )}
    </nav>
  );
};

export default Sidebar;
