import React from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { PageContainer } from "../PageContainer";
import styles from "./SearchResults.module.css";

const SearchResults = () => {
	const { searchWord } = useParams();
	const history = useHistory();

	const beers = useSelector((state) =>
		Object.values(state.beer)
	);
	const breweries = useSelector((state) =>
		Object.values(state.breweries)
	);

	const beers_set = new Set();
	beers.forEach((beer, index) => {
		if (beer.name.toLowerCase().includes(searchWord.toLowerCase())) {
			beers_set.add(index);
		}
		if (
			beer.style.toLowerCase().includes(searchWord.toLowerCase())
		) {
			beers_set.add(index);
		}
	});

	const breweries_set = new Set();
	breweries.forEach((brewery, index) => {
		if (brewery.name.toLowerCase().includes(searchWord.toLowerCase())) {
			breweries_set.add(index);
		}
	});

	const sendToBeer = (beer_index) => {
		history.push(`/beers/${beer_index + 1}`);
	};

	const matchedBeers = Array.from(beers_set);

	const sendToBrewery = (brewery_index) => {
		history.push(`/breweries/${brewery_index + 1}`);
	};

	const matchedBreweries = Array.from(breweries_set);

	return (
		<PageContainer>
			<div className={styles.all_restaurants}>
				{matchedBreweries.length ? (
					<div className={styles.parent_container_each}>
						<div
							className={styles.search_intro_message}
						>{`You searched for "${searchWord}":`}</div>
						<div>
							<strong>
								{`Your search result has returned ${matchedBreweries.length} breweries
								and ${matchedBeers.length} beers: `}
							</strong>
						</div>
						<div className={styles.each_restaurant}>
							{matchedBreweries.map(
								(brewery_index, idx) => (
									<div
										className={styles.each_wrapper}
										onClick={() => sendToBrewery(brewery_index)}
										key={idx} >
										<img
											src={ breweries[brewery_index].profile_image }
											alt="brewery"
											width="200px"
										></img>
										<div className={styles.each_wrapper_info} >
											<div>
												{ breweries[brewery_index].name }
											</div>
											<div>
												<i className="fa-solid fa-map-location-dot"></i>
												<span>
													{ breweries[brewery_index].brewery_type}
												</span>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				) : (
					<div className={styles.no_search_results}>
						<div>No Search Results Were Found.</div>
					</div>
				)}
			</div>
		</PageContainer>
	);
};

export default SearchResults;
