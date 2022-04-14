import React from "react";
import { useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./BreweriesList.module.css";



const BreweriesList = () => {
    const history = useHistory()
	// const dispatch = useDispatch()
    const breweries = useSelector((state) => Object.values(state.breweries))
	const createBrewery = () => history.push('/new-brewery')

	const goToBrewery = (id) => {
		history.push(`/breweries/${id}`);
		return;
	};

	return (
		<div className={styles.container}>

			<div className={styles.all_container}>
                Breweries Page
				<div role='button' onClick={createBrewery} className={styles.button}>
					Create New Brewery
				</div>
				{breweries.map((brewery) => (
					<div
						onClick={() => goToBrewery(brewery.id)}
						className={styles.each_container}
						key={brewery.id}
					>
						<div className={styles.card_img}>
							<img src={brewery.profile_image} alt="brewery" />
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
	);
};

export default BreweriesList;
