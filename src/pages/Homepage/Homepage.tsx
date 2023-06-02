import { useEffect, useState } from "react";
import { Car } from "../../models/Car.model";
import CarItem from "../../components/Cars/CarItem";
import styles from "./Homepage.module.scss";
import Pagination from "../../components/Pagination/Pagination";

export type fetchCarsFn = () => void;

interface HomepageProps {
  cars: Car[];
  fetchCars: fetchCarsFn;
}

const Homepage = ({ cars, fetchCars }: HomepageProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const totalPosts = cars.length;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = cars.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {}, [cars]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
        currentPage={currentPage}
      />
      <p title="Cars Available" className={styles["total-cars"]}>
        Cars Available: {totalPosts}
      </p>
      <p title="Cars Available" className={styles["total-cars-mobile"]}>
        {totalPosts}
      </p>
      <div className={styles["cars-wrapper"]}>
        {currentPosts.length > 0 &&
          currentPosts.map((car) => (
            <CarItem fetchCars={fetchCars} key={car.id} car={car} />
          ))}
      </div>
    </div>
  );
};

export default Homepage;
