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

import RatingsBar from "../RatingsBar";
import ImageModal from "../Modal/ImageModal";


const Brewhub = () => {
	const dispatch = useDispatch()
	const history = useHistory();

    const sessionUser = useSelector((state) => state?.session?.user);
    console.log(sessionUser)
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

    let beersList;
    let likes;
    let numLikes;


    if (userBrewery) {
        beersList = Object.values(userBrewery?.beers)
        likes = Object.values(userBrewery?.likes)
        numLikes = likes.length;
    }


    let totalBreweryReviews = [];
    beersList.map(beer => {
        let beerReviews = Object.values(beer?.reviews)
        totalBreweryReviews = [...totalBreweryReviews, ...beerReviews]
    })


	let reviewsList;
    let beerLikes;
	currentBeerId ? reviewsList = Object.values(selectedBeer?.reviews) : reviewsList = null
	currentBeerId ? beerLikes = selectedBeer?.likes : beerLikes = null



	let uniqueReviews;
	let reviewerSet = new Set();

	if (reviewsList) {
		reviewsList.forEach(review=> {
			reviewerSet.add(review.user_id)
		})
		uniqueReviews = reviewerSet.size

	}

	const userReviews = () => {
        let count = 0;
        reviewsList?.forEach(review => {
            if (review?.user_id === sessionUser?.id) count+=1;
        })
        return count;
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

	const imagePreview = (image) => {
        dispatch(setCurrentModal(() => (<ImageModal image={image} />)));
        dispatch(showModal());
    }

	const goToBrewery = async (id) => {
        await history.push(`/breweries/${id}`)
    }

	return (
		<PageContainer>
			<h1>Welcome to the Brewhub!</h1>
			<div className={styles.page}>
                <div className={styles.left}>
					<div className={styles.info}>
                        <div className={styles.first_info} >
                            <div className={styles.card_img}>
                                <img src={userBrewery.profile_image} alt="brewery" onError={addDefaultImage} onClick={()=>imagePreview(userBrewery.profile_image)}/>
                            </div>
                            <div className={styles.middle}>
                                <h2>{userBrewery.name}</h2>
                                <h4>{userBrewery?.street}</h4>
								<h4>{userBrewery?.city}, {userBrewery?.state} {userBrewery?.country}</h4>
								<h4>{userBrewery?.country}</h4>
								<h4>{`(${userBrewery?.phone.slice(
										0,
										3
									)}) ${userBrewery?.phone.slice(
										3,
										6
									)}-${userBrewery?.phone.slice(6)}`}
								</h4>
                                <p>{breweryType(userBrewery.brewery_type)} Brewery</p>
                            </div>
                        </div>
                        <div className={styles.second_info}>
                                    <div  className={styles.row}>
                                        <p><RatingsBar rating={userBrewery.rating} /></p>
                                    </div>
                                    <div className={styles.row}>
                                        {totalBreweryReviews.length} Ratings
                                    </div>
                                    <div className={styles.row}>
                                         {userBeers.length} Beers
                                    </div>
                                    <div className={styles.row_end}>
										{numLikes === 1 ? `${numLikes} Like` : `${numLikes} Likes`}
                                    </div>
                            </div>
                        <div>
                            <div className={styles.third_info}>
                                <h4>
                                    {userBrewery.header}
                                </h4>
                                {!showMoreBrewery && userBrewery.description.length > 150 ?
                                    <div className={styles.show}>
                                        {userBrewery.description.slice(0,150)}...
                                        <div onClick={() => setShowMoreBrewery(!showMoreBrewery)}>Show more</div>
                                     </div>
                                    : !showMoreBrewery && userBrewery.description.length < 150 ?
                                                <div className={styles.show}>{userBrewery.description}</div> :
                                    <div className={styles.show}>
                                        {userBrewery.description}
                                        <div onClick={() => setShowMoreBrewery(!showMoreBrewery)}>Show Less</div>
                                    </div> }
                            </div>
                        </div>
                    </div>
				</div>
				<div className={styles.right}>
					<div className={styles.right_container}>
						<div className={styles.brewery_button_container}>
							<h2>Brewery Settings</h2>
							<UpdateBrewery brewery={userBrewery}/>
							<DeleteBrewery brewery_id={userBrewery.id}/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.page}>
                <div className={styles.left}>
					{ selectedBeer ?
					<div className={styles.info}>
                        <div className={styles.first_info} >
                            <div className={styles.card_img}>
                                <img src={selectedBeer.beer_image} alt="beer" onError={addDefaultImage} onClick={()=>imagePreview(selectedBeer.beer_image)}/>
                            </div>
                            <div className={styles.middle}>
                                <h2>{selectedBeer.name}</h2>
                                <h4 onClick={() => goToBrewery(selectedBeer.brewery_id)}>{selectedBeer.brewery_name}</h4>
                                <p>{selectedBeer.style}</p>
                            </div>
                            <div className={styles.end}>
                                <div>
                                    <p>TOTAL</p>
                                    {reviewsList.length}
                                </div>
                                <div>
                                    <p>UNIQUE</p>
                                    {uniqueReviews}
                                </div>
                                {sessionUser
                                ?
                                <div>
                                    <p>YOU</p>
                                    {userReviews()}
                                </div>
                                :
                                <div>
                                    <p>YOU</p>
                                    0
                                </div>}
                                <div>
                                    <p>LIKES</p>
                                    {beerLikes}
                                </div>
                            </div>
                        </div>
                        <div className={styles.second_info}>
                                <div  className={styles.row}>
                                    {selectedBeer.abv}% ABV
                                </div>
                                <div className={styles.row}>
                                    {selectedBeer.ibu} IBU
                                </div>
                                <div className={styles.row}>
                                    <p><RatingsBar rating={selectedBeer.rating} /></p>
                                </div>
								<div className={styles.row_end_beer} onClick={() => goToBeer(selectedBeer.id)}>
									Go to Beer <i className="fa-solid fa-angle-right"></i>
                                </div>
                        </div>
                        <div>
                            <div className={styles.third_info}>
                                {!showMoreBeer && selectedBeer.description.length > 150 ?
                                    <div className={styles.show}>
                                        {selectedBeer.description.slice(0,150)}...
                                        <div onClick={() => setShowMoreBeer(!showMoreBeer)}>Show more</div>
                                     </div>
                                    : !showMoreBeer && selectedBeer.description.length < 150 ?
                                                <div className={styles.show}>{selectedBeer.description}</div> :
                                    <div className={styles.show}>
                                        {selectedBeer.description}
                                        <div onClick={() => setShowMoreBeer(!showMoreBeer)}>Show Less</div>
                                    </div> }
                            </div>
                        </div>
                    </div>
					:
					<div className={styles.info}>
						No beers created yet
					</div> }
                </div>
				<div className={styles.right}>
					<div className={styles.right_container}>
						<div className={styles.brewery_button_container}>
							<h2>Beer Settings</h2>
							<div role='button' onClick={showNewBeerForm} className={styles.button}>Create New Beer</div>
							{selectedBeer && <div role='button' onClick={showEditBeerForm} className={styles.button}>Edit Beer</div> }
							{selectedBeer && <div role='button' onClick={showDeleteBeerForm} className={styles.button}>Delete Beer</div> }
						</div>
						<div className={styles.select_container}>
							<h3 >Beer List</h3>
							{currentBeerId ? userBeers.map((beer) => (
								<div className={styles.one_beer} key={beer.id} value={beer.id} onClick={(e)=> setCurrentBeerId(beer.id)}>
									{beer.name}
									</div>
								))
							: <div>- No Beers Created Yet</div>}
						</div >
					</div>
				</div>
			</div>
		</PageContainer>
	);
};

export default Brewhub;
