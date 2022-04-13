import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./BreweriesList.module.css";


const BreweriesList = () => {
    const history = useHistory()
    const breweries = useSelector((state) => Object.values(state.breweries))

    console.log('BREWERIES', breweries)
	return (
		<div className={styles.container}>
			<div className={styles.all_container}>
                Breweries Page
				{breweries.map((brewery) => (
					<div
						// onClick={() => goToBrewery(brewery.id)}
						className={styles.each_container}
						key={brewery.id}
					>
						<div className={styles.card_img}>
							<img src={brewery.profile_image} alt="brewery" />
						</div>
						<div className={styles.info}>
							<h3>
								{brewery?.name?.length > 20
									? brewery?.name?.slice(0, 20) + "..."
									: brewery?.name}
							</h3>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BreweriesList;
