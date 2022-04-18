import React, { useEffect, useState } from "react"
import { PageContainer } from "../PageContainer";
import styles from "./Brewhub.module.css";
import { useDispatch, useSelector } from "react-redux";
import { showModal, setCurrentModal } from '../../store/modal';
import { UpdateBrewery } from "../UpdateBrewery";
import { DeleteBrewery } from "../DeleteBrewery";
import {DeleteBeer} from "../Beer/DeleteBeer"
import { BeerForm } from "../../forms/BeerForm";


const Brewhub = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const userBreweries = Object?.values(sessionUser.breweries)
	const [currentBrewery, setCurrentBrewery] = useState(userBreweries[0])
	const breweryBeers = Object?.values(currentBrewery?.beer)
	const [currentBeerId, setCurrentBeerId] = useState(breweryBeers[0].id)
	const [showMore, setShowMore] = useState(false)

	const selectedBeer = breweryBeers.find(beer => beer.id === +currentBeerId)
	console.log('Selected BEER', selectedBeer)

	// useEffect(() => {

	// },[currentBeer, currentBrewery])

	const dispatch = useDispatch()

    const showDeleteBeerForm = () => {
        dispatch(setCurrentModal(() => (<DeleteBeer beer_id={currentBeerId} />)));
        dispatch(showModal());
      }
    const showEditBeerForm = () => {
        dispatch(setCurrentModal(() => (<BeerForm beer={selectedBeer} />)));
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
				<div className={styles.select_container}>
					<div>
						<div className={styles.input_container}>
							<label htmlFor="currentBrewery">Select Brewery</label>
							<select
								name="currentBrewery"
								value={currentBrewery}
								selected={currentBrewery}
								onChange={(e) => setCurrentBrewery(e.target.value)}
							>
								{userBreweries.map((brewery) => (
									<option key={brewery.id} value={brewery.id}>
										{brewery.name}
										</option>
									))}
							</select>
						</div>
						<div className={styles.button_container}>
							<UpdateBrewery brewery={currentBrewery}/>
							<DeleteBrewery brewery_id={currentBrewery.id}/>
						</div>
					</div>
					<div>
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
							<div role='button' onClick={showEditBeerForm} className={styles.button}>Edit Beer</div>
							<div role='button' onClick={showDeleteBeerForm} className={styles.button}>Delete Beer</div>
						</div>
					</div>
				</div >
				<div className={styles.info}>
                        <div className={styles.first_info} >
                            <div className={styles.card_img}>
                                <img src={currentBrewery.profile_image} alt="brewery" />
                            </div>
                            <div className={styles.middle}>
                                <h2>{currentBrewery.name}</h2>
                                <div>{currentBrewery.street}</div>
                                <div>{currentBrewery.city}, {currentBrewery.state}</div>
                                <div>{currentBrewery.country}</div>
                                <div>Brewery Type - {breweryType(currentBrewery.brewery_type)}</div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.third_info}>
                                <h3>
                                    {currentBrewery.header}
                                </h3>
                                {!showMore && currentBrewery.description.length > 100 ?
                                    <div className={styles.no_show}>
                                        {currentBrewery.description.slice(0,100)}...
                                        <div onClick={() => setShowMore(!showMore)}>Show more</div>
                                     </div>
                                    :
                                    <div className={styles.show}>
                                        {currentBrewery.description}
                                        <div onClick={() => setShowMore(!showMore)}>Show Less</div>
                                    </div> }
                            </div>
                        </div>
                    </div>
			</div>
		</PageContainer>
	);
};

export default Brewhub;
