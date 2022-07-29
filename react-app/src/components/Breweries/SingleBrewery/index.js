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
import loadingImage from "../../../images/cheers-beer.gif"

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
        return (
			<PageContainer>
				<div className={styles.container}>
					<img src={loadingImage} alt="loading" />
				</div>
			</PageContainer>
		);
    }

    let beersList;
    let likes;
    let numLikes;
    let uniqueReviews;

    if (brewery) {
        beersList = Object.values(brewery?.beers)
        likes = Object.values(brewery?.likes)
        numLikes = likes.length;
    }


    let reviewsList = [];
    beersList.forEach(beer => {
        let beerReviews = Object.values(beer?.reviews)
        reviewsList = [...reviewsList, ...beerReviews]
    })

    reviewsList.sort(function (a, b) {
        let dateA = new Date(a.updated_at), dateB = new Date(b.updated_at)
        return dateB - dateA
    });

    //find number of unique users that posted reviews
    let reviewerSet = new Set();
    let userImageSet = new Set();
    reviewsList.forEach(review=> {
        reviewerSet.add(review.user_id)
        userImageSet.add(review.user_image)
    })
    uniqueReviews = reviewerSet.size


    // let type = brewery.brewery_type;
    const breweryType = (type) => {
        if (type === "micro") return "Micro"
        if (type === "brewpub") return "Brewpub"
        if (type === "regional") return "Regional"
        if (type === "large") return "Large"
    }


    const userReviews = () => {
        let count = 0;
        reviewsList?.forEach(review => {
            if (review?.user_id === sessionUser?.id) count+=1;
        })
        return count;
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
                                    {uniqueReviews}
                                </div>
                                <div>
                                    <p>YOU</p>
                                    {sessionUser ? userReviews(): 0}
                                </div>

                                <div>
                                    <p>LIKES</p>
                                    {numLikes ? numLikes : 0}
                                </div>
                            </div>
                        </div>
                        <div className={styles.second_info}>
                                    <div  className={styles.row}>
                                        <div className={styles.ratings_bar}><RatingsBar rating={brewery.rating} /></div>
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
                        <h2>{numLikes ? numLikes : 0}</h2>
                        <h4 className={styles.like_header}>PEOPLE LIKE THIS BREWERY</h4>
                        {likes.map((like) => (
                            <img key={like.id} className={styles.loyal_reviewers} src={like.user_image} alt='user' onError={addDefaultImage}/>
                        ))}
                    </div>
                    <div className={styles.right_container}>
                        <h3>Beer List</h3>
                        {beersList && beersList.map(beer => (
                            <div key={beer.id} className={styles.beer_link} onClick={() => goToBeer(beer.id)}>
                                    <img className={styles.right_image} src={beer.beer_image} alt='beer' onError={addDefaultImage}/>
                                    <div className={styles.text_container}>
                                        <h4>{beer.name}</h4>
                                        <p>{beer.style}</p>
                                        <p><RatingsBar rating={beer.rating} /></p>
                                    </div>
                                </div>
                        ))}
                    </div>
                    <div className={styles.join_us}>
                        <h3>Come Join Us!</h3>
                        <p>{brewery?.street}</p>
                        <p>{brewery?.city}, {brewery?.state} {brewery?.country}</p>
                        <p>{brewery?.country}</p>
                        <p>{`(${brewery?.phone.slice(
                                0,
                                3
                            )}) ${brewery?.phone.slice(
                                3,
                                6
                            )}-${brewery?.phone.slice(6)}`}
                        </p>
                </div>
                </div>
            </div>
        </PageContainer>
    )
};
