import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./SearchCard.module.css";
import defaultImage from "../../../images/default_image.png"
import RatingsBar from "../../RatingsBar";



const SearchCard = ({type, content}) => {
    const history = useHistory()

	const goToBeer = (id) => {
		history.push(`/beer/${id}`);
		return;
	};

	const goToBrewery = (id) => {
		history.push(`/breweries/${id}`);
		return;
	};

	const addDefaultImage = (e) => {
        e.target.src = defaultImage
    }

    let beersCount;
    let reviewsCount;

    if (type === "brewery") {
        const beersList = Object.values(content?.beers)

        const calculateRatingsCount = () => {
            let count = 0;
            beersList.forEach(beer => {
                let reviewsList = Object.values(beer?.reviews)
                count += reviewsList.length
            })
            return count;
        }

        beersCount = Object.keys(content?.beers).length
        reviewsCount = calculateRatingsCount()
    }

    return (
        <>
        {type === "beer"
            ?
            <div className={styles.infoBeer}>
                <div className={styles.first_info} >
                    <div className={styles.card_img}>
                        <img src={content?.beer_image} alt="beer" onError={addDefaultImage}/>
                    </div>
                    <div className={styles.middle}>
                        <h3 onClick={() => goToBeer(content?.id)}>{content?.name}</h3>
                        <h5 onClick={() => goToBrewery(content?.brewery_id)}>{content?.brewery_name}</h5>
                        <p>{content?.style}</p>
                    </div>
                </div>
                <div className={styles.second_info}>
                    <div className={styles.second_top}>
                        <div>
                            {content?.abv}% ABV
                        </div>
                        <div>
                            {content?.ibu} IBU
                        </div>
                    </div>
                    <div className={styles.second_bottom}>
                        <RatingsBar rating={content?.rating}/>
                    </div>
                </div>
            </div>
            :
            <div className={styles.infoBeer}>
                <div className={styles.first_info} >
                    <div className={styles.card_img}>
                        <img src={content?.profile_image} alt="brewery" onError={addDefaultImage}/>
                    </div>
                    <div className={styles.middle}>
                        <h3 onClick={() => goToBrewery(content?.id)}>{content?.name}</h3>
                        <p>Type: {content?.brewery_type}</p>
                    </div>
                </div>
                <div className={styles.second_info}>
                    <div className={styles.second_top}>
                        <div>
                            {beersCount} Beers
                        </div>
                        <div>
                            {reviewsCount} Reviews
                        </div>
                    </div>
                    <div className={styles.second_bottom}>
                        <RatingsBar rating={content?.rating}/>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default SearchCard;
