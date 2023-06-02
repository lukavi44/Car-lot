import { NavLink } from "react-router-dom";
import { Car } from "../../models/Car.model";
import styles from "./CarItem.module.scss";
import btnStyles from "../UI/DeleteButton.module.scss";
import DeleteButton from "../UI/DeleteButton";
import placeholderImg from "../../assets/placeholder.png";
import { fetchCarsFn } from "../../pages/Homepage/Homepage";

interface CarItemProps {
  car: Car;
  fetchCars: fetchCarsFn;
}

const CarItem = ({ car, fetchCars }: CarItemProps) => {
  return (
    <div className={styles["car-item-wrapper"]}>
      {car.picture ? (
        <img className={styles["car-picture"]} src={car.picture} alt="car" />
      ) : (
        <img
          className={styles["car-picture"]}
          src={placeholderImg}
          alt="placeholder"
        />
      )}
      <div className={styles.bottom}>
        <h2>
          {car.manufacturer} {car.model}
        </h2>
        <p>price: {car.price}$</p>
        <div className={styles["actions"]}>
          <button className={btnStyles["action-btn"]}>
            <NavLink to={`car/read/${car.id}`}>View Details</NavLink>
          </button>
          <DeleteButton fetchCars={fetchCars} car={car} />
        </div>
      </div>
    </div>
  );
};

export default CarItem;
