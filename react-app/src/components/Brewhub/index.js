import React, { useEffect, useState } from "react"
import { PageContainer } from "../PageContainer";
import styles from "./Brewhub.module.css";
import { useDispatch, useSelector } from "react-redux";
import { showModal, setCurrentModal } from '../../store/modal';
import { UpdateBrewery } from "../UpdateBrewery";
import { DeleteBrewery } from "../DeleteBrewery";
import {DeleteBeer} from "../Beer/DeleteBeer"
import { BeerForm } from "../../forms/BeerForm";
import { CreateBrewery } from "../CreateBrewery";
import { receiveOneBeer } from "../../store/beer";
import { receiveOneBrewery } from "../../store/breweries";
import { BreweryForm } from "../../forms/BreweryForm";


const Brewhub = () => {
	const dispatch = useDispatch()

	const sessionUser = useSelector((state) => state.session.user);
	const breweries = useSelector((state) => state.breweries)
	const beers = useSelector((state) => state.beer)

	const breweriesArray = Object.values(breweries)
	const beersArray = Object.values(beers)

	const userBreweries = breweriesArray.filter(brewery => brewery.owner_id === sessionUser.id)
	const [currentBreweryId, setCurrentBreweryId] = useState(userBreweries[0]?.id)

	console.log("currentBreweryId", currentBreweryId)

	const breweryBeers = beersArray.filter(beer => beer.brewery_id === +currentBreweryId)
	const selectedBrewery = userBreweries.find(brewery => brewery.id === +currentBreweryId)

	console.log("brewryBeers", breweryBeers)

	const [currentBeerId, setCurrentBeerId] = useState(breweryBeers[0]?.id || null)

	console.log("currentBeerId", currentBeerId)

	const selectedBeer = breweryBeers.find(beer => beer.id === +currentBeerId)

	console.log("selectedBeer", selectedBeer)

	const [showMoreBrewery, setShowMoreBrewery] = useState(false)
	const [showMoreBeer, setShowMoreBeer] = useState(false)
	useEffect(() => {
	},[currentBeerId])

	// useEffect(() => {
    //     (async () => {
    //         await dispatch(receiveOneBrewery(currentBreweryId))
    //         await dispatch(receiveOneBeer(currentBeerId))
    //         // setLoaded(true);
    //     })();
    // }, [dispatch]);

	const setBrewery = (e) => {
		setCurrentBreweryId(e.target.value)
		setCurrentBeerId(breweryBeers[0].id || null)
	}



    const showDeleteBeerForm = () => {
        dispatch(setCurrentModal(() => (<DeleteBeer beer_id={currentBeerId} />)));
        dispatch(showModal());
      }
    const showEditBeerForm = () => {
        dispatch(setCurrentModal(() => (<BeerForm beer={selectedBeer} breweryId={currentBreweryId}/>)));
        dispatch(showModal());
      }
    const showNewBeerForm = () => {
        dispatch(setCurrentModal(() => (<BeerForm breweryId={currentBreweryId} />)));
        dispatch(showModal());
      }


	const breweryType = (type) => {
        if (type === "micro") return "Micro"
        if (type === "brewpub") return "Brewpub"
        if (type === "regional") return "Regional"
        if (type === "large") return "Large"
    }

	return (
		<PageContainer>
			<div className={styles.container}>
				<h1>Welcome to the Brewhub!</h1>
				<div className={styles.select_container}>
				{selectedBrewery &&  <div>
						<div className={styles.input_container}>
							<label htmlFor="currentBreweryId">Select Brewery</label>
							<select
								name="currentBreweryId"
								value={currentBreweryId}
								selected={currentBreweryId}
								onChange={setBrewery}
							>
								{userBreweries.map((brewery) => (
									<option key={brewery.id} value={brewery.id}>
										{brewery.name}
										</option>
									))}
							</select>
						</div>
						<div className={styles.button_container}>
							<CreateBrewery />
							<div>
								<UpdateBrewery brewery={selectedBrewery}/>
								<DeleteBrewery brewery_id={currentBreweryId}/>
							</div>
						</div>
					</div> }
					{breweryBeers &&  <div>
						<div className={styles.input_container}>
							<label htmlFor="currentBeerId">Select Beer</label>
							<select
								name="currentBeerId"
								value={currentBeerId}
								selected={currentBeerId}
								onChange={(e) => setCurrentBeerId(e.target.value)}
							>
								{breweryBeers.map((beer) => (
									<option key={beer.id} value={beer.id}>
										{beer.name}
										</option>
									))}
							</select>
						</div>
						<div className={styles.button_container}>
							<div role='button' onClick={showNewBeerForm} className={styles.button}>Create New Beer</div>
							<div>
								<div role='button' onClick={showEditBeerForm} className={styles.button}>Edit Beer</div>
								<div role='button' onClick={showDeleteBeerForm} className={styles.button}>Delete Beer</div>
							</div>
						</div>
					</div> }
				</div >
				<div className={styles.selected_container} >
					<div className={styles.infoBrewery}>
						<div className={styles?.first_info} >
							<div className={styles?.card_img}>
								<img src={selectedBrewery?.profile_image} alt="brewery" />
							</div>
							<div className={styles.middle}>
								<h2>{selectedBrewery?.name}</h2>
								<div>{selectedBrewery?.street}</div>
								<div>{selectedBrewery?.city}, {selectedBrewery?.state}</div>
								<div>{selectedBrewery?.country}</div>
								<div>Brewery Type - {breweryType(selectedBrewery?.brewery_type)}</div>
							</div>
						</div>
						<div>
							<div className={styles.third_info}>
								<h3>
									{selectedBrewery?.header}
								</h3>
								{!showMoreBrewery && selectedBrewery?.description?.length > 100 ?
									<div className={styles.no_showBrewery}>
										{selectedBrewery?.description?.slice(0,100)}...
										<div onClick={() => setShowMoreBrewery(!showMoreBrewery)}>Show more</div>
									</div>
									:
									<div className={styles.showBrewery}>
										{selectedBrewery?.description}
										<div onClick={() => setShowMoreBrewery(!showMoreBrewery)}>Show Less</div>
									</div> }
							</div>
						</div>
					</div>
					<div className={styles.infoBeer}>
						<div className={styles.first_info} >
							<div className={styles.card_img}>
								<img src={selectedBeer?.beer_image} alt="beer" />
							</div>
							<div className={styles.middle}>
								<h2>{selectedBeer?.name}</h2>
								<h4>{selectedBeer?.brewery_name}</h4>
								<div>{selectedBeer?.style}</div>
							</div>
						</div>
							<div className={styles.second_info}>
									<div  className={styles.row}>
										{selectedBeer?.abv}% ABV
									</div>
									<div className={styles.row}>
										{selectedBeer?.ibu} IBU
									</div>
							</div>
						<div>
							<div className={styles.third_info}>
								{!showMoreBeer && selectedBeer?.description.length > 100 ?
									<div className={styles.no_showBeer}>
										{selectedBeer?.description.slice(0,100)}...
										<div onClick={() => setShowMoreBeer(!showMoreBeer)}>Show more</div>
									</div>
									:
									<div className={styles.showBeer}>
										{selectedBeer?.description}
										<div onClick={() => setShowMoreBeer(!showMoreBeer)}>Show Less</div>
									</div> }
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageContainer>
	);
};

export default Brewhub;
