import styles from './RatingsBar.module.css'
const RatingsBar = ({rating}) => {


    const circlePercentage = `${(rating/5)*100 }%`

    return (
        <div className={styles.ratings_bar}>
            <div className={styles.outer}>
                <div className={styles.inner} style={{width: `${circlePercentage}`}}></div>
            </div>
            <div className={styles.value}>({rating})</div>
        </div>
    )
}

export default RatingsBar;
