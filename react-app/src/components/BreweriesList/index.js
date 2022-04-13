import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./BreweriesList.module.css";


const BreweriesList = () => {
    const history = useHistory()


	return (
		<div className={styles.container}>
			<div className={styles.all_container}>
                Breweries Page
				{/* {all_restaurants.map((restaurant) => (
					<div
						onClick={() => goToRestaurant(restaurant.id)}
						className={styles.each_container}
						key={restaurant.id}
					>
						<div className={styles.card_img}>
							<img src={restaurant.img_url} alt="restaurant" />
						</div>
						<div className={styles.info}>
							<h3>
								{restaurant?.name?.length > 20
									? restaurant?.name?.slice(0, 20) + "..."
									: restaurant?.name}
							</h3>
							<div className={styles.borough_price}>
								<span>
									<i className="fa-solid fa-city"></i>
									{restaurant.borough}
								</span>
								<span>{`${
									restaurant.price_rating === 4
										? "$$$$"
										: restaurant.price_rating === 3
										? "$$$"
										: restaurant.price_rating === 2
										? "$$"
										: "$"
								}`}</span>
							</div>
						</div>
					</div>
				))} */}
			</div>
		</div>
	);
};

export default BreweriesList;
