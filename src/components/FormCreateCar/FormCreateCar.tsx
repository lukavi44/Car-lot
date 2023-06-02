import { useState } from "react";
import { Car } from "../../models/Car.model";
import { postCar } from "../../services/Cars.services";
import axios from "axios";
import styles from "./FormCreateCar.module.scss";
import btnStyles from "../UI/DeleteButton.module.scss";
import { toast } from "react-toastify";

interface FormProps {
  fetchCars: any;
}

const FormCreateCar = ({ fetchCars }: FormProps) => {
  const [form, setForm] = useState<Car>({
    id: "",
    manufacturer: "",
    model: "",
    picture: "",
    transmission: "",
    fuel: "",
    type: "",
    price: 0,
  });

  const formSubmissionHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await postCar(form);
      toast.success(
        `Car ${form.manufacturer} ${form.model} has been successfully created`
      );
      fetchCars();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Something went wrong.Car has not been created");
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={formSubmissionHandler}>
        <div className={styles["form-group"]}>
          <label htmlFor="">Manufacturer</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            placeholder="e.g. Audi"
            required
            defaultValue={form.manufacturer}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                manufacturer: e.target.value,
              }))
            }
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            placeholder="e.g. A4"
            required
            defaultValue={form.model}
            onChange={(e) =>
              setForm((prev: any) => ({ ...prev, model: e.target.value }))
            }
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="picture">Picture</label>
          <input
            type="text"
            id="picture"
            name="picture"
            placeholder="enter img url..."
            defaultValue={form.picture}
            onChange={(e) =>
              setForm((prev: any) => ({ ...prev, picture: e.target.value }))
            }
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="transmission">Transmission</label>
          <input
            type="text"
            id="transmission"
            name="transmission"
            placeholder="e.g. manual"
            defaultValue={form.transmission}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                transmission: e.target.value,
              }))
            }
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="fuel">Fuel</label>
          <input
            type="text"
            id="fuel"
            name="fuel"
            placeholder="e.g. diesel"
            defaultValue={form.fuel}
            onChange={(e) =>
              setForm((prev: any) => ({ ...prev, fuel: e.target.value }))
            }
          />
        </div>{" "}
        <div className={styles["form-group"]}>
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="e.g. hatchback"
            required
            defaultValue={form.type}
            onChange={(e) =>
              setForm((prev: any) => ({ ...prev, type: e.target.value }))
            }
          />
        </div>{" "}
        <div className={styles["form-group"]}>
          <label htmlFor="price">Price</label>
          <input
            step={500}
            type="number"
            id="price"
            name="price"
            min={0}
            required
            defaultValue={form.price}
            onChange={(e) =>
              setForm((prev: any) => ({ ...prev, price: +e.target.value }))
            }
          />
        </div>
        <button id="submit" className={btnStyles["action-btn"]} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default FormCreateCar;
