import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import styles from "./BreweriesList.module.css";
import NewBreweryForm from "../../forms/NewBreweryForm";
import { showModal, setCurrentModal } from "../../store/modal";



const BreweriesList = () => {
    // const history = useHistory()
	const dispatch = useDispatch()
    const breweries = useSelector((state) => Object.values(state.breweries))


	const createBrewery = () => {
		dispatch(setCurrentModal(NewBreweryForm))
		dispatch(showModal());
	}

	return (
		<div className={styles.container}>

			<div className={styles.all_container}>
                Breweries Page
				<div role='button' onClick={createBrewery}>
					Create New Brewery
				</div>
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
