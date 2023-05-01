import React from 'react';
import styles from "../../../css/Pagination.module.css";

const Pagination = ({ pagination, currentPage, setCurrentPage, paged }) => {

    const numPages = pagination.length + 1;

    const pageNumbers = [...Array(numPages + 1).keys()].slice(1)

    const nextPage = () => {
        if (currentPage !== numPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <>
            {pagination.length > 0 && paged &&
                <nav>
                    <ul className={styles['pagination']} >

                        <li className={styles['page-item']} >
                            <span onClick={prevPage} className={`${styles['poem_btn']} ${currentPage === 1 ? styles['hidden'] : ''}`}>
                                <img className={currentPage === 1 ? styles['off'] : styles['on']} alt="" src="assets/images/previous-page.svg" />
                            </span>
                        </li>

                        {pageNumbers.map(pgNumber => (
                            <li key={pgNumber}
                                className={`${styles['page-item']} ${currentPage === pgNumber ? styles['active'] : ''}`} >

                                {/*   <p className={styles['page-link']} onClick={() => setCurrentPage(pgNumber)} >
                                    {pgNumber}
                                </p>
                        */}
                                <span onClick={() => setCurrentPage(pgNumber)} className={styles['poem_btn']}>
                                    {pgNumber}
                                </span>
                            </li>
                        ))}

                        <li className={styles['page-item']} >
                            <span onClick={nextPage}
                                className={`${styles['poem_btn']} ${currentPage === pagination.length + 1 ? styles['hidden'] : ''}`}

                            >
                                <img className={currentPage === pagination.length + 1 ? styles['off'] : styles['on']} alt="" src="assets/images/next-page.svg" />
                            </span>
                        </li>
                    </ul>
                </nav>
            }
        </>
    )
}

export default Pagination