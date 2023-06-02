import { useEffect, useState } from "react";
import styles from "./Pagination.module.scss";
import previousIcon from "../../assets/icons/previous.png";
import nextIcon from "../../assets/icons/next.png";
import lastPage from "../../assets/icons/last_page.png";
import firstPage from "../../assets/icons/first_page.png";

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: any;
  currentPage: number;
}

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: PaginationProps) => {
  const pageNumbers: number[] = [];
  const [displayedNumbers, setDisplayedNumbers] = useState<number[]>([]);
  const numbersToShow = 3;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  useEffect(() => {
    calculateDisplayedPages();
    if (currentPage > totalPages) {
      paginate(totalPages);
    }
  }, [currentPage, totalPages]);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const calculateDisplayedPages = () => {
    const halfRange = Math.floor(numbersToShow / 2);
    let startPage = Math.max(currentPage - halfRange, 1);
    let endPage = Math.min(startPage + numbersToShow - 1, totalPages);

    if (endPage - startPage + 1 < numbersToShow) {
      startPage = Math.max(endPage - numbersToShow + 1, 1);
    }

    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
    setDisplayedNumbers(pages);
  };

  const renderDisplayedNumbers = () => {
    return displayedNumbers.map((number) => (
      <button
        onClick={() => paginate(number)}
        className={styles["page-link"]}
        key={number}
      >
        <li
          className={
            currentPage === number
              ? styles["current-page"]
              : styles["page-item"]
          }
        >
          {number}
        </li>
      </button>
    ));
  };
  return (
    <nav className={styles.pagination}>
      <ul>
        {currentPage > 1 && (
          <button onClick={() => paginate(totalPages / totalPages)}>
            <li className={`${styles.navigation} ${styles["first-page"]}`}>
              <img src={firstPage} alt="first" />
            </li>
          </button>
        )}
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>
            <li className={`${styles.navigation} ${styles["previous-page"]}`}>
              <img src={previousIcon} alt="previous" />
            </li>
          </button>
        )}
        {renderDisplayedNumbers()}
        {currentPage < totalPages && (
          <button onClick={() => paginate(currentPage + 1)}>
            <li className={styles.navigation}>
              <img src={nextIcon} alt="previous" />
            </li>
          </button>
        )}
        {currentPage !== totalPages && (
          <button onClick={() => paginate(totalPages)}>
            <li className={`${styles.navigation} ${styles["last-page"]}`}>
              <img src={lastPage} alt="last" />
            </li>
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
