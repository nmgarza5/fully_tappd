import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { PageContainer } from "../../PageContainer";
import styles from "./BeerList.module.css";
import defaultImage from "../../../images/default_image.png"
import { receiveBeer } from "../../../store/beer";
import { authenticate } from "../../../store/session";


const BeerList = () => {
    const history = useHistory()
	// const dispatch = useDispatch()
    const allBeer = useSelector((state) => Object.values(state.beer))
	// const createBeer = () => history.push('/new-beer')
	const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

	useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            await dispatch(receiveBeer())
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

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

	const avgRating = (reviews) => {
        let sum = 0;
		let reviewsList = Object.values(reviews)
        reviewsList.forEach(review => sum += review.rating)
        let avg = sum / reviewsList.length;
        if (avg) return `${avg.toFixed(2)}/5`
        else return "No Ratings"
    }



	return (
		<PageContainer>
			<div className={styles.container}>
					{allBeer.map((beer) => (
					<div key={beer.id} className={styles.selected_container} >
						<div className={styles.infoBeer}>
							<div className={styles.first_info} >
								<div className={styles.card_img}>
									<img src={beer?.beer_image} alt="beer" onError={addDefaultImage}/>
								</div>
								<div className={styles.middle}>
									<h2>{beer?.name}</h2>
									<h4 onClick={() => goToBrewery(beer.brewery_id)}>{beer?.brewery_name}</h4>
									<div>Beer Style: {beer?.style}</div>
								</div>
								<div className={styles.second_info}>
									<div  className={styles.row}>
										{beer?.abv}% ABV
									</div>
									<div className={styles.row}>
										{beer?.ibu} IBU
									</div>
									<div className={styles.row}>
										Rating: {avgRating(beer.reviews)}
									</div>
									<div className={styles.beer_link} onClick={() => goToBeer(beer.id)}>
										Go To Beer <i className="fa-solid fa-angle-right"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
					))}

			</div>
		</PageContainer>
	);
};

export default BeerList;
