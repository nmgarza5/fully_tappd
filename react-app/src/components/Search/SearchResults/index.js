import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { PageContainer } from "../../PageContainer";
import SearchCard from "../SearchCard"
import styles from "./SearchResults.module.css";
import defaultImage from "../../../images/default_image.png"
import { receiveBreweries } from "../../../store/breweries";
import { receiveBeer } from "../../../store/beer";
import RatingsBar from "../../RatingsBar";

const SearchResults = () => {
	const { searchWord } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const [selected, setSelected] = useState("beer")
	const [searchQuery, setSearchQuery] = useState("");
	const [loaded, setLoaded] = useState(false);

	const beers = useSelector((state) =>
		Object.values(state.beer)
	);
	const breweries = useSelector((state) =>
		Object.values(state.breweries)
	);

    useEffect(() => {
        (async () => {
            await dispatch(receiveBreweries());
            await dispatch(receiveBeer());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }



	const beer_sort_ratings = beers.sort((a,b) => (b.rating - a.rating));
	const topTenBeers = beer_sort_ratings.slice(0, 11);

	const breweries_sort_ratings = breweries.sort((a,b) => (b.rating - a.rating));
	const topTenBreweries = breweries_sort_ratings.slice(0, 11);


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

	const matchedBeers = Array.from(beers_set);
	const matchedBreweries = Array.from(breweries_set);


	const sendToBeer = (beer_id) => {
		history.push(`/beer/${beer_id}`);
	};

	const sendToBrewery = (brewery_id) => {
		history.push(`/breweries/${brewery_id}`);
	};

	const addDefaultImage = (e) => {
		e.target.src = defaultImage
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (searchQuery.includes("%")) {
			alert(
				`Please do not use the "percent" symbol in your search query.`
			);
			setSearchQuery("");
		} else if (searchQuery) {
			history.push(`/search/${searchQuery}`);
		} else {
			alert(`Please enter a search query.`);
		}
		return;
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSubmit(e);
		}
	};


	return (
		<PageContainer>
			<div className={styles.page}>
                <div className={styles.left}>
					<div className={styles.search_bar}>
						<div>
							<i className="fa-solid fa-magnifying-glass fa-2x"></i>
							<input
								className={styles.search_box_field}
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Search for Breweries or Beers"
							/>
						</div>
						<div onClick={handleSubmit} className={styles.button}>
							Search
						</div>
					</div>
					<div className={styles.main_container}>
						<div className={styles.select_container}>
							{selected === "beer"
							?
							<span className={styles.beer_selected}>
								Beer
							</span>
							:
							<span className={styles.beer_not_selected} onClick={()=>setSelected("beer")}>
								Beer
							</span>
							}
							{selected === "brewery"
							?
							<span className={styles.brewery_selected}>
								Brewery
							</span>
							:
							<span className={styles.brewery_not_selected}  onClick={()=>setSelected("brewery")}>
								Brewery
							</span>
							}
						</div>
						{selected === "beer" &&
						<>
							{matchedBeers.length > 0
							?
							<>
								<p className={styles.num_results}>
									<strong>{matchedBeers.length} beer</strong> results for <strong>"{searchWord}"</strong>
								</p>
								{matchedBeers.map(beer => (
									<SearchCard key={beer.id} type={"beer"} content={beer} />
								))}
							</>
							:
							<div className={styles.no_results}>
								Sorry there are no matching beers, please search again...
							</div>}
						</>
						}
						{selected === "brewery" &&
						<>
							{matchedBreweries.length > 0
							?
							<>
								<p className={styles.num_results}>
									<strong>{matchedBreweries.length} brewery</strong> results for <strong>"{searchWord}"</strong>
								</p>
								{matchedBreweries.map(brewery => (
									<SearchCard key={brewery.id} type={"brewery"} content={brewery} />
								))}
							</>
							:
							<div className={styles.no_results}>
								Sorry there are no matching breweries, please search again...
							</div>}
						</>
						}
					</div>

				</div>
				<div className={styles.right}>
					<div className={styles.right_container}>
						<h3>Top Beers</h3>
						{topTenBeers.map(beer => (
							<div key={beer.id} className={styles.beer_link} onClick={() => sendToBeer(beer.id)}>
								<img className={styles.right_image} src={beer.beer_image} alt='beer image' onError={addDefaultImage}/>
								<div className={styles.text_container}>
									<h4>{beer.name}</h4>
									<p>{beer.brewery_name}</p>
								</div>
							</div>
						))}
					</div>
					<div className={styles.right_container}>
						<h3>Top Breweries</h3>
						{topTenBreweries.map(brewery => (
							<div key={brewery.id} className={styles.beer_link} onClick={() => sendToBeer(brewery.id)}>
								<img className={styles.right_image} src={brewery.profile_image} alt='brewery image' onError={addDefaultImage}/>
								<div className={styles.text_container}>
									<h4>{brewery.name}</h4>
									<p><RatingsBar rating={brewery.rating}/></p>
								</div>
							</div>
						))}
					</div>
                </div>
			</div>
		</PageContainer>
	);
};

export default SearchResults;
