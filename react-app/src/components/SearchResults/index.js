import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { PageContainer } from "../PageContainer";
import BeerCardSmall from "../Beer/BeerCardSmall"
import styles from "./SearchResults.module.css";

const SearchResults = () => {
	const { searchWord } = useParams();
	const history = useHistory();
	const [selected, setSelected] = useState("Beer")

	const beers = useSelector((state) =>
		Object.values(state.beer)
	);
	const breweries = useSelector((state) =>
		Object.values(state.breweries)
	);
	console.log('beers', beers)
	const beer_sort_ratings = beers.sort((a,b) => (b.rating - a.rating));
	const topTenBeers = beer_sort_ratings.slice(0, 11);
	console.log("TopTen --- ", topTenBeers)

	const beers_set = new Set();
	beers.forEach((beer) => {
		if (beer.name.toLowerCase().includes(searchWord.toLowerCase())) {
			beers_set.add(beer);
		}
		if (
			beer.style.toLowerCase().includes(searchWord.toLowerCase())
		) {
			beers_set.add(beer);
		}
	});

	const breweries_set = new Set();
	breweries.forEach((brewery) => {
		if (brewery.name.toLowerCase().includes(searchWord.toLowerCase())) {
			breweries_set.add(brewery);
		}
	});

	const sendToBeer = (beer_id) => {
		history.push(`/beer/${beer_id}`);
	};

	const matchedBeers = Array.from(beers_set);

	const sendToBrewery = (brewery_id) => {
		history.push(`/breweries/${brewery_id}`);
	};

	const matchedBreweries = Array.from(breweries_set);


	return (
		<PageContainer>
			<div className={styles.page}>
                <div className={styles.left}>
					{matchedBeers.length || matchedBreweries.length ?
						<>
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
							</div>

							<div  className={styles.results}>
								<div  className={styles.beer_results}>
									{matchedBeers.map(
										(beer) => (
											<BeerCardSmall key={beer.id} beer={beer} />
									))}
								</div>
								{/* Place the brewery listings here */}
							</div>
						</>
					 : (
						<div className={styles.no_search_results}>
							<div>No Search Results Were Found.</div>
						</div>
					)}
				</div>
				<div className={styles.right}>
					<div className={styles.right_container}>
						<p>Top Beers</p>
						{topTenBeers.map(beer => (
							<div key={beer.id} className={styles.beer_link} onClick={() => sendToBeer(beer.id)}>
								<img className={styles.right_image} src={beer.beer_image} alt='beer image' />
								{beer.name}
							</div>
						))}
					</div>

                </div>
			</div>
		</PageContainer>
	);
};

export default SearchResults;
