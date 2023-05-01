import Balancer from 'react-wrap-balancer'
import styles from "../../../css/PoemTitle.module.css";

function PoemTitle({

    title_fry,
    title_nl,
    showFY,
    showNL,
    poet

}) {

    return (
        <>
            <div className={`${styles.title_container_grid}
             ${!showFY || !showNL ? styles.show_one : ''}`}>
                {showFY &&
                    <div className={styles['title-fy']}>
                        <p><Balancer>{title_fry}</Balancer></p>
                    </div>
                }
                {showNL &&
                    <div className={styles['title-nl']}>
                        <p><Balancer>{title_nl}</Balancer></p>
                    </div>
                }
                <div className={styles['poet-name']}>
                    <p>{poet}</p>
                </div>
            </div>
        </>
    )
}

export default PoemTitle;
