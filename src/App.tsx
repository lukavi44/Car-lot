import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../src/pages/Login/Login";
import ProtectedRoutes from "./router/ProtectedRoutes";
import Homepage from "./pages/Homepage/Homepage";
import CarDetails from "./pages/CarDetails/CarDetails";
import Sidebar from "./components/Sidebar/Sidebar";
import { Car } from "./models/Car.model";
import { getCars } from "./services/Cars.services";
import styles from "./App.module.css";

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [cars, setCars] = useState<Car[]>([
    {
      id: "",
      manufacturer: "",
      model: "",
      picture: "",
      transmission: "",
      fuel: "",
      type: "",
      price: 0,
    },
  ]);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const fetchCars = () => {
    getCars()
      .then((response) => {
        const decodedString = atob(response.data.data as unknown as string);
        const dataParsed: Car[] = JSON.parse(decodedString);
        setCars(dataParsed);
      })
      .catch((error) => toast.error(error));
  };

  return (
    <div className={styles["app-wrapper"]}>
      {!isLoginPage && (
        <Sidebar fetchCars={fetchCars} setAccessToken={setAccessToken} />
      )}
      <Routes>
        <Route element={<ProtectedRoutes accessToken={accessToken} />}>
          <Route
            path="/"
            element={<Homepage cars={cars} fetchCars={fetchCars} />}
          />
          <Route path="car/read/:id" element={<CarDetails />} />
        </Route>
        <Route
          path="login"
          element={<Login setAccessToken={setAccessToken} />}
        />
      </Routes>
      <ToastContainer limit={5} pauseOnHover={true} />
    </div>
  );
}

export default App;
