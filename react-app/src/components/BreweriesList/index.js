import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { PageContainer } from "../PageContainer";
import styles from "./BreweriesList.module.css";
import defaultImage from "../../images/default_image.png"
import { receiveBreweries } from "../../store/breweries";
import { authenticate } from "../../store/session";


const BreweriesList = () => {
    const history = useHistory()
	const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const breweries = useSelector((state) => Object.values(state.breweries))


	useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            await dispatch(receiveBreweries())
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }


	const goToBrewery = (id) => {
		history.push(`/breweries/${id}`);
		return;
	};

	const addDefaultImage = (e) => {
        e.target.src = defaultImage
    }

	return (
		<PageContainer>
			<div className={styles.container}>
				<div className={styles.all_container}>
					{breweries.map((brewery) => (
						<div
							onClick={() => goToBrewery(brewery.id)}
							className={styles.each_container}
							key={brewery.id}
						>
							<div className={styles.card_img}>
								<img src={brewery.profile_image} alt="brewery" onError={addDefaultImage}/>
							</div>
							<div className={styles.info}>
								<h3>
									{/* {brewery?.name?.length > 20
										? brewery?.name?.slice(0, 20) + "..."
										: brewery?.name} */}
										{brewery.name}
								</h3>
								<p>{brewery.header}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</PageContainer>
	);
};

export default BreweriesList;
