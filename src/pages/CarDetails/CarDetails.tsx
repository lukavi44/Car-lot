import { useEffect, useState } from "react";
import styles from "./CarDetails.module.scss";
import { getOneCar } from "../../services/Cars.services";
import { useParams } from "react-router-dom";
import { Car } from "../../models/Car.model";
import DeleteButton from "../../components/UI/DeleteButton";
import placeholderImg from "../../assets/placeholder.png";
import { toast } from "react-toastify";

const CarDetails = () => {
  const [car, setCar] = useState<Car>();
  const { id } = useParams();

  useEffect(() => {
    fetchCar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [car]);

  const fetchCar = () => {
    if (id) {
      getOneCar(id)
        .then((response) => {
          const decodedString = atob(response.data.data as unknown as string);
          const dataParsed: Car = JSON.parse(decodedString);
          setCar(dataParsed);
        })
        .catch((error) => toast.error(error));
    }
  };
  return (
    <>
      <div className={styles.container}>
        {car && (
          <div className={styles["car-details-wrapper"]}>
            <div className={styles.left}>
              {car.picture ? (
                <img src={car.picture} alt="car" />
              ) : (
                <img src={placeholderImg} alt="placeholder" />
              )}
            </div>
            <div className={styles.right}>
              <h2>{car.manufacturer}</h2>
              <p>{car.model}</p>
              <div className={styles["car-info-group"]}>
                <label>Price:</label>
                <p>{car.price}$</p>
              </div>
              <div className={styles["car-info-group"]}>
                <label>Transmission:</label>
                <p>{car.transmission}</p>
              </div>
              <div className={styles["car-info-group"]}>
                <label>Fuel:</label>
                <p>{car.fuel}</p>
              </div>
              <div className={styles["car-info-group"]}>
                <label>Type:</label>
                <p>{car.type}</p>
              </div>
              <DeleteButton car={car} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CarDetails;
