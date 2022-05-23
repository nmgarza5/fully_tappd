import React from "react";
import { useHistory, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import styles from "./SingleBrewery.module.css";
import { receiveOneBrewery } from "../../../store/breweries";
import { authenticate } from "../../../store/session"
import { PageContainer } from "../../PageContainer";
import defaultImage from "../../../images/default_image.png"
import RatingsBar from "../../RatingsBar";
import ReviewCard from "../../Reviews/ReviewCard";
import LikeButton from "../../LikeButton";

export const SingleBrewery = () => {


    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [showMore, setShowMore] = useState(false)
	const { id } = useParams();
    const history = useHistory();
    const sessionUser = useSelector((state) => state?.session?.user);
	const brewery = useSelector((state) => state.breweries)[`${id}`];

    const likeId = sessionUser?.brewery_likes[`${id}`]?.id;
    const isLike = sessionUser?.brewery_likes?.hasOwnProperty(`${id}`)

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

    let beersList;
    let numLikes;

    if (brewery) {
        beersList = Object.values(brewery?.beers)
        numLikes = Object.values(brewery?.likes).length
    }
    console.log("numLikes", numLikes)

    let reviewsList = [];
    beersList.map(beer => {
        let beerReviews = Object.values(beer?.reviews)
        reviewsList = [...reviewsList, ...beerReviews]
    })

    reviewsList.sort(function (a, b) {
        let dateA = new Date(a.updated_at), dateB = new Date(b.updated_at)
        return dateB - dateA
    });


    // let type = brewery.brewery_type;
    const breweryType = (type) => {
        if (type === "micro") return "Micro"
        if (type === "brewpub") return "Brewpub"
        if (type === "regional") return "Regional"
        if (type === "large") return "Large"
    }

    const addDefaultImage = (e) => {
        e.target.src = defaultImage
    }


    const goToBeer = async (id) => {
        await history.push(`/beer/${id}`)
    }

    return (
        <PageContainer>
            <div className={styles.page}>
                <div className={styles.left}>
                    <div className={styles.info}>
                        <div className={styles.first_info} >
                            <div className={styles.card_img}>
                                <img src={brewery.profile_image} alt="brewery" onError={addDefaultImage}/>
                            </div>
                            <div className={styles.middle}>
                                <h2>{brewery.name}</h2>
                                <h4>{brewery.city}, {brewery.state} {brewery.country}</h4>
                                <p>{breweryType(brewery.brewery_type)} Brewery</p>
                            </div>
                            <div className={styles.end}>
                                <div>
                                    <p>TOTAL</p>
                                    {reviewsList.length}
                                </div>
                                <div>
                                    <p>UNIQUE</p>
                                    {/* {uniqueReviews} */}
                                </div>
                                <div>
                                    <p>YOU</p>
                                    {/* {sessionUser ? userReviews(): 0} */} 0
                                </div>

                                <div>
                                    <p>LIKES</p>
                                    {numLikes ? numLikes : 0}
                                </div>
                            </div>
                        </div>
                        <div className={styles.second_info}>
                                    <div  className={styles.row}>
                                        <p><RatingsBar rating={brewery.rating} /></p>
                                    </div>
                                    <div className={styles.row}>
                                        {reviewsList.length} Ratings
                                    </div>
                                    <div className={styles.row}>
                                         {beersList.length} Beers
                                    </div>
                                    <div className={styles.row_end}>
                                       {sessionUser ?
                                        <>
                                            <LikeButton id={+id} type={"brewery"} isLike={isLike} likeId={likeId} />
                                        </>
                                        :
                                        <>Sign in to Interact</> }
                                    </div>

                            </div>
                        <div>
                            <div className={styles.third_info}>
                                <h3>
                                    {brewery.header}
                                </h3>
                                {!showMore && brewery.description.length > 150 ?
                                    <div className={styles.show}>
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
                    {reviewsList.length >0 ?
                    <div className={styles.review_container} >
                            {reviewsList.map(review => (
                                <ReviewCard review={review} />
                            ))
                            }
                    </div> :
                    <div className={styles.review_container}>
                        <h2>There are no reviews for this Beer... be the first by clicking the green check above!</h2>
                    </div> }
                </div>
                <div className={styles.right}>
                    <div className={styles.right_container}>
                        <h2>"Brewery Like #"</h2>
                        <h3>PEOPLE LIKE THIS BREWERY</h3>
                    </div>
                    <div className={styles.right_container}>
                        <h3>Beer List</h3>
                        {beersList && beersList.map(beer => (
                            <div key={beer.id} className={styles.beer_link} onClick={() => goToBeer(beer.id)}>
                                    <img className={styles.right_image} src={beer.beer_image} alt='beer image' onError={addDefaultImage}/>
                                    <div className={styles.text_container}>
                                        <h4>{beer.name}</h4>
                                        <p>{beer.style}</p>
                                        <p><RatingsBar rating={beer.rating} /></p>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageContainer>
    )
};
