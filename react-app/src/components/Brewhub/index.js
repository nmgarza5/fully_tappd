import React, { useState, useEffect } from "react"
import { PageContainer } from "../PageContainer";
import styles from "./Brewhub.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showModal, setCurrentModal } from '../../store/modal';
import { UpdateBrewery } from "../Breweries/UpdateBrewery";
import { DeleteBrewery } from "../Breweries/DeleteBrewery";
import {DeleteBeer} from "../Beer/DeleteBeer"
import { BeerForm } from "../../forms/BeerForm";

// import { CreateBrewery } from "../CreateBrewery";
// import { receiveOneBeer } from "../../store/beer";
// import { receiveOneBrewery } from "../../store/breweries";
// import { BreweryForm } from "../../forms/BreweryForm";
// import { receiveUserBrewery } from "../../store/session";
import defaultImage from "../../images/default_image.png"
import { authenticate } from "../../store/session";


const Brewhub = () => {
	const dispatch = useDispatch()
	const history = useHistory();

	const userBrewery = useSelector((state) => Object.values(state.session.user.breweries)[0])
	const userBeers = Object.values(userBrewery.beers)
	const [currentBeerId, setCurrentBeerId] = useState(userBeers[0]?.id || null)
	const selectedBeer = userBeers.find(beer => beer.id === +currentBeerId)
	// const [display, setDisplay] = useState("")
	const [showMoreBrewery, setShowMoreBrewery] = useState(false)
	const [showMoreBeer, setShowMoreBeer] = useState(false)

	const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
			await dispatch(authenticate())
            // await dispatch(receiveBeer())
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

	const getNextBeerId = () => {
		const currentIndex = userBeers.indexOf(selectedBeer);
		if (userBeers[currentIndex+1]) {
			const nextBeer = userBeers[currentIndex+1]
			return nextBeer.id
		}
		if (userBeers[currentIndex-1]) {
			const nextBeer = userBeers[currentIndex-1]
			return nextBeer.id
		}
	}

	// const getNextBeerId = () => {
	// 	const currentIndex = userBeers.indexOf(selectedBeer);
	// 	if (userBeers[currentIndex+1]) {
	// 		const nextBeer = userBeers[currentIndex+1]
	// 		return nextBeer.id
	// 	}
	// }


	let reviewsList;
	currentBeerId ? reviewsList = Object.values(selectedBeer?.reviews) : reviewsList = null

    const avgRating = () => {
        let sum = 0;
        reviewsList.forEach(review => sum += review.rating)
        let avg = sum / reviewsList.length;
        if (avg) return `${avg.toFixed(2)}/5`
        else return "No Ratings"
    }

	const goToBeer = async (id) => {
        await history.push(`/beer/${id}`)
    }


    const showDeleteBeerForm = () => {
		dispatch(setCurrentModal(() => (<DeleteBeer beer_id={currentBeerId} />)));
		dispatch(showModal());
		setCurrentBeerId(getNextBeerId())

      }
    const showEditBeerForm = () => {
        dispatch(setCurrentModal(() => (<BeerForm beer={selectedBeer} breweryId={userBrewery.id}/>)));
        dispatch(showModal());
      }
    const showNewBeerForm = () => {
        dispatch(setCurrentModal(() => (<BeerForm breweryId={userBrewery.id} />)));
        dispatch(showModal());
		// setCurrentBeerId(getNextBeerId())
      }


	const breweryType = (type) => {
        if (type === "micro") return "Micro"
        if (type === "brewpub") return "Brewpub"
        if (type === "regional") return "Regional"
        if (type === "large") return "Large"
    }

	const addDefaultImage = (e) => {
        e.target.src = defaultImage
    }


	return (
		<PageContainer>
			<div className={styles.container}>
				<h1>Welcome to the Brewhub!</h1>
				<div className={styles.infoBrewery}>
				<div className={styles.brewery_button_container}>
					<UpdateBrewery brewery={userBrewery}/>
					<DeleteBrewery brewery_id={userBrewery.id}/>
				</div>
					<div className={styles?.first_info} >
						<div className={styles?.card_img}>
							<img src={userBrewery?.profile_image} alt="brewery" onError={addDefaultImage}/>
						</div>
						<div className={styles.middle}>
							<h2>{userBrewery?.name}</h2>
						</div>
						<div>
							<div>{userBrewery?.street}</div>
							<div>{userBrewery?.city}, {userBrewery?.state}</div>
							<div>{userBrewery?.country}</div>
							<div>Brewery Type - {breweryType(userBrewery?.brewery_type)}</div>
							<div>{`(${userBrewery?.phone.slice(
									0,
									3
								)}) ${userBrewery?.phone.slice(
									3,
									6
								)}-${userBrewery?.phone.slice(6)}`}
							</div>
						</div>
					</div>
					<div>
						<div className={styles.third_info}>
							<h3>
								{userBrewery?.header}
							</h3>
							{!showMoreBrewery && userBrewery?.description?.length > 220 ?
								<div className={styles.no_showBrewery}>
									{userBrewery?.description?.slice(0,220)}...
									<div onClick={() => setShowMoreBrewery(!showMoreBrewery)}>Show more</div>
									</div>
								: !showMoreBrewery && userBrewery?.description?.length < 220 ?
											<div className={styles.showBrewery}>{userBrewery?.description}</div> :
								<div className={styles.showBrewery}>
									{userBrewery?.description}
									<div onClick={() => setShowMoreBrewery(!showMoreBrewery)}>Show Less</div>
								</div> }
						</div>
					</div>
				</div>
				{userBeers &&
				<div className={styles.beer_container}>
					<div className={styles.button_container}>
						<div role='button' onClick={showNewBeerForm} className={styles.button}>Create New Beer</div>
						{selectedBeer && <div role='button' onClick={showEditBeerForm} className={styles.button}>Edit Beer</div> }
						{selectedBeer && <div role='button' onClick={showDeleteBeerForm} className={styles.button}>Delete Beer</div> }
					</div>
					<div className={styles.outer_container}>
						<div className={styles.select_container}>
									<div htmlFor="currentBeerId">Beer List</div>

									{currentBeerId ? userBeers.map((beer) => (
										<div className={styles.one_beer} key={beer.id} value={beer.id} onClick={(e)=> setCurrentBeerId(beer.id)}>
											{beer.name}
											</div>
										))
									: <div>- No Beers Created Yet</div>}
						</div >
						<div className={styles.selected_container} >
							{selectedBeer && <div className={styles.infoBeer}>
								<div className={styles.first_info} >
									<div className={styles.card_img}>
										<img src={selectedBeer?.beer_image} alt="beer" onError={addDefaultImage}/>
									</div>
									<div className={styles.middle}>
										<h2>{selectedBeer?.name}</h2>
										<h4>{selectedBeer?.brewery_name}</h4>
										<div>Beer Style: {selectedBeer?.style}</div>
									</div>
									<div className={styles.second_info}>
											<div  className={styles.row}>
												{selectedBeer?.abv}% ABV
											</div>
											<div className={styles.row}>
												{selectedBeer?.ibu} IBU
											</div>
											<div className={styles.row}>
                                            	Rating: {avgRating()}
                                        	</div>
											<div className={styles.beer_link} onClick={() => goToBeer(selectedBeer.id)}>
                                            	Go To Beer <i className="fa-solid fa-angle-right"></i>
                                        	</div>
									</div>
								</div>
								<div>
									<div className={styles.third_info}>
											{!showMoreBeer && selectedBeer?.description?.length > 140 ?

											<div className={styles.no_showBeer}>
												{selectedBeer?.description?.slice(0,140)}...
												<div onClick={() => setShowMoreBeer(!showMoreBeer)}>Show more</div>
											</div>

											: !showMoreBeer && selectedBeer?.description?.length < 140 ?

											<div className={styles.showBeer}>{selectedBeer?.description}</div>
											:
											<div className={styles.showBeer}>
												{selectedBeer?.description}
												<div onClick={() => setShowMoreBeer(!showMoreBeer)}>Show Less</div>
											</div> }
									</div>
								</div>
							</div> }
						</div>
					</div>
				</div> }
			</div>
		</PageContainer>
	);
};

export default Brewhub;
