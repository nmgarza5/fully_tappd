import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./BeerCardSmall.module.css";
import defaultImage from "../../../images/default_image.png"



const BeerCardSmall = ({beer}) => {
    console.log('BEER', beer)
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

    return (
        <div className={styles.infoBeer}>
            <div className={styles.first_info} >
                <div className={styles.card_img}>
                    <img src={beer?.beer_image} alt="beer" onError={addDefaultImage}/>
                </div>
                <div className={styles.middle}>
                    <h2 onClick={() => goToBeer(beer.id)}>{beer?.name}</h2>
                    <h4 onClick={() => goToBrewery(beer.brewery_id)}>{beer?.brewery_name}</h4>
                </div>
            </div>
            <div className={styles.second_info}>
            </div>
        </div>
    )
}

export default BeerCardSmall;
