import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import styles from "./SingleBrewery.module.css";
import { receiveOneBrewery } from "../../store/breweries";
import { authenticate } from "../../store/session"

// import { UpdateBrewery } from "../UpdateBrewery";
import { PageContainer } from "../PageContainer";
// import { DeleteBrewery } from "../DeleteBrewery";
// import defaultProfileImage from "../../images/default_profile_image.png"
import defaultImage from "../../images/default_image.png"

export const SingleBrewery = () => {
    // const sessionUser = useSelector((state) => state?.session?.user);
    const [loaded, setLoaded] = useState(false);
	const { id } = useParams();
    const history = useHistory();
	const brewery = useSelector((state) => state.breweries)[`${id}`];
    const beersList = Object.values(brewery.beers)
    const [showMore, setShowMore] = useState(false)

    const dispatch = useDispatch();
    // let type = brewery.brewery_type;
    const breweryType = (type) => {
        if (type === "micro") return "Micro"
        if (type === "brewpub") return "Brewpub"
        if (type === "regional") return "Regional"
        if (type === "large") return "Large"
    }

    const calculateRatingsCount = () => {
        let count = 0;
        beersList.forEach(beer => {
            let reviewsList = Object.values(beer.reviews)
            count += reviewsList.length
        })
        return count;
    }

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            await dispatch(receiveOneBrewery(id))
            setLoaded(true);
        })();
    }, [dispatch, id]);

    if (!loaded) {
        return null;
    }

    // const calculateRating = () => {
    //     let  = 0;
    //     beersList.forEach(beer => {
    //         let reviewsList = Object.values(beer.reviews)
    //         count += reviewsList.length
    //         console.log(count)
    //     })
    //     return count;
    // }

    // "brewpub" ? "Brewpub" : "regional" ? "Regional" : "large" ? "Large" : null

    // let isOwner = false;
	// sessionUser && brewery?.owner_id === sessionUser.id
    // ? (isOwner = true)
    // : (isOwner = false);

    const addDefaultImage = (e) => {
        e.target.src = defaultImage
    }

    const goToBeer = async (id) => {
        await history.push(`/beer/${id}`)
    }

    return (
        <PageContainer>
            {/* {isOwner &&
            <>
                <UpdateBrewery brewery={brewery} />
                <DeleteBrewery brewery_id={brewery.id} />
            </>
            } */}
            <div className={styles.page}>
                <div className={styles.left}>
                    <div className={styles.info}>
                        {/* <div style={{backgroundImage: `url(${brewery.banner_image})`}}></div> */}
                        <div className={styles.first_info} >
                            <div className={styles.card_img}>
                                <img src={brewery.profile_image} alt="brewery" onError={addDefaultImage}/>
                            </div>
                            <div className={styles.middle}>
                                <h2>{brewery.name}</h2>
                                <div>{brewery.street}</div>
                                <div>{brewery.city}, {brewery.state}</div>
                                <div>{brewery.country}</div>
                                <div>Brewery Type - {breweryType(brewery.brewery_type)}</div>
                            </div>
                            {/* <div className={styles.end}>
                                <div>Total Checkins</div>
                                <div>Monthly Average</div>
                                <div># of your checkins</div>
                                <div># of Favorites</div>
                            </div> */}
                        </div>
                        {/* <div> */}
                            <div className={styles.second_info}>
                                {/* <div className={styles.row}> */}
                                    {/* <div  className={styles.row}>
                                        Avg Rating
                                    </div> */}
                                    <div className={styles.row}>
                                        # of Ratings: {calculateRatingsCount()}
                                    </div>
                                    <div className={styles.row_end}>
                                        # of Beers: {beersList.length}
                                    </div>
                                    {/* <div className={styles.row_end}>
                                        <i className="fa-solid fa-star fa-2x"></i>
                                    </div> */}
                              {/* </div> */}
                            </div>
                        {/* </div> */}
                        <div>
                            <div className={styles.third_info}>
                                <h3>
                                    {brewery.header}
                                </h3>
                                {!showMore && brewery.description.length > 150 ?
                                    <div className={styles.no_show}>
                                        {brewery.description.slice(0,150)}...
                                        <div onClick={() => setShowMore(!showMore)}>Show more</div>
                                     </div>
                                    : !showMore && brewery.description.length < 150 ?
                                                <div className={styles.show}>{brewery.description}</div> :
                                    <div className={styles.show}>
                                        {brewery.description}
                                        <div onClick={() => setShowMore(!showMore)}>Show Less</div>
                                    </div> }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <h3>Beer List</h3>
                    {beersList && beersList.map(beer => (
                        <div key={beer.id} className={styles.beer_link} onClick={() => goToBeer(beer.id)}>{beer.name}</div>
                    ))}
                </div>
            </div>
        </PageContainer>
    )
};
