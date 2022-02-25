import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, showSearch } from "../../redux/actions";
import styles from "./PaginationBar.module.css";

function PaginationBar() {
  const dispatch = useDispatch();
  const { pages, currentPage, showSearchResults } = useSelector(
    (state) => state
  );

  let pagination;

  if (pages.length <= 5) {
    pagination = pages.map((page, i) => (
      <button
        className={currentPage === i ? styles.currentPage : undefined}
        onClick={() => dispatch(setCurrentPage(i))}
        key={i + 1}
      >
        {i + 1}
      </button>
    ));
  } else if (currentPage < 2) {
    pagination = (
      <div className={styles.container}>
        <button
          className={currentPage === 0 ? styles.currentPage : undefined}
          onClick={() => dispatch(setCurrentPage(0))}
        >
          1
        </button>
        <button
          className={currentPage === 1 ? styles.currentPage : undefined}
          onClick={() => dispatch(setCurrentPage(1))}
        >
          2
        </button>
        <button
          className={currentPage === 2 ? styles.currentPage : undefined}
          onClick={() => dispatch(setCurrentPage(2))}
        >
          3
        </button>
        <button className={styles.btn_fill}>...</button>
        <button onClick={() => dispatch(setCurrentPage(pages.length - 1))}>
          {pages.length}
        </button>
      </div>
    );
  } else if (currentPage === 2) {
    pagination = (
      <div className={styles.container}>
        <button
          className={currentPage === 0 ? styles.currentPage : undefined}
          onClick={() => dispatch(setCurrentPage(0))}
        >
          1
        </button>
        <button
          className={currentPage === 1 ? styles.currentPage : undefined}
          onClick={() => dispatch(setCurrentPage(1))}
        >
          2
        </button>
        <button
          className={currentPage === 2 ? styles.currentPage : undefined}
          onClick={() => dispatch(setCurrentPage(2))}
        >
          3
        </button>
        <button onClick={() => dispatch(setCurrentPage(3))}>4</button>
        <button className={styles.btn_fill}>...</button>
        <button onClick={() => dispatch(setCurrentPage(pages.length - 1))}>
          {pages.length}
        </button>
      </div>
    );
  } else if (currentPage < pages.length - 3) {
    pagination = (
      <div className={styles.container}>
        <button onClick={() => dispatch(setCurrentPage(0))}>1</button>
        <button className={styles.btn_fill}>...</button>
        <button onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
          {currentPage}
        </button>
        <button
          className={styles.currentPage}
          onClick={() => dispatch(setCurrentPage(currentPage))}
        >
          {currentPage + 1}
        </button>
        <button onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
          {currentPage + 2}
        </button>
        <button className={styles.btn_fill}>...</button>
        <button onClick={() => dispatch(setCurrentPage(pages.length - 1))}>
          {pages.length}
        </button>
      </div>
    );
  } else if (currentPage < pages.length - 2) {
    pagination = (
      <div className={styles.container}>
        <button onClick={() => dispatch(setCurrentPage(0))}>1</button>
        <button className={styles.btn_fill}>...</button>
        <button onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
          {currentPage}
        </button>
        <button
          className={styles.currentPage}
          onClick={() => dispatch(setCurrentPage(currentPage))}
        >
          {currentPage + 1}
        </button>
        <button onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
          {currentPage + 2}
        </button>
        <button onClick={() => dispatch(setCurrentPage(pages.length - 1))}>
          {pages.length}
        </button>
      </div>
    );
  } else if (currentPage + 1 === pages.length - 1) {
    pagination = (
      <div className={styles.container}>
        <button onClick={() => dispatch(setCurrentPage(0))}>1</button>
        <button className={styles.btn_fill}>...</button>
        <button onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
          {currentPage}
        </button>
        <button
          className={styles.currentPage}
          onClick={() => dispatch(setCurrentPage(currentPage))}
        >
          {currentPage + 1}
        </button>
        <button onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
          {currentPage + 2}
        </button>
      </div>
    );
  } else {
    pagination = (
      <div className={styles.container}>
        <button onClick={() => dispatch(setCurrentPage(0))}>1</button>
        <button className={styles.btn_fill}>...</button>
        <button onClick={() => dispatch(setCurrentPage(currentPage - 2))}>
          {currentPage - 1}
        </button>
        <button onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
          {currentPage}
        </button>
        <button
          className={styles.currentPage}
          onClick={() => dispatch(setCurrentPage(currentPage))}
        >
          {currentPage + 1}
        </button>
      </div>
    );
  }

  const changeCurrentPage = (str) => {
    switch (str) {
      case "right":
        currentPage < pages.length - 1 &&
          dispatch(setCurrentPage(currentPage + 1));
        break;
      case "left":
        currentPage > 0 && dispatch(setCurrentPage(currentPage - 1));
        break;
      default:
        break;
    }
  };

  if (typeof pages === "string" || pages.length < 2) return <></>;

  return (
    <div className={styles.PaginationBar}>
      {currentPage > 0 ? (
        <button
          className={styles.btn_left}
          onClick={() => changeCurrentPage("left")}
        >
          {"<<"}
        </button>
      ) : (
        ""
      )}
      {showSearchResults ? (
        <p onClick={() => dispatch(showSearch(false))}>
          Showing N results for GAME. X
        </p>
      ) : (
        pagination
      )}
      {!showSearchResults && currentPage !== pages.length - 1 ? (
        <button
          className={styles.btn_right}
          onClick={() => changeCurrentPage("right")}
        >
          {">>"}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default PaginationBar;

/* 
///////////////// LOGICA PAGINATION BAR///////////////
if pages = 5, currentPage = any
    ---> 1, 2, 3, 4, 5
if pages > 5, currentPage = 1
    ---> 1, 2, 3, ..., n
if pages > 5, currentPage = 2
    ---> 1, 2, 3, ..., n
if pages > 5, currentPage = 3
    ---> 1, 2, 3, 4, ..., n
if pages > 5, currentPage = 4
    ---> 1, ...,  3, 4, 5, ..., n
if pages > 5, currentPage = 5
    ---> 1, ...,  4, 5, 6, ..., n
resumen:
CASO 1 --- if pages <=5 , listar todas las paginas.
else if, depende de currentPage:
CASO 2 --- if currentPage 1 o 2: ---> 1, 2, 3, ..., n
CASO 3 --- if currentPage 3: ---> 1, 2, 3, 4, ..., n
------------------------------------------- hsta aca esta bien
CASO 4    if (c < n - 2) {
            1 , ... , c-1 , c , c+1 , ... , n
CASO 5    } else if (c < n - 1) {
            1 , ... , c-1 , c , c+1 , n
CASO 6    } else {
            1 , ... , c-1 , c , n
CASO 7    }
    
c = 97
n = 100
---> 1, ... , 96 , 97 , 98 , ... , 100
c = 98
n = 100
---> 1, ... , 97 , 98 , 99 , 100
c = 99
n = 100
---> 1 , ... , 98, 99, 100
 */
