import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import styles from "./SingleBeer.module.css";
import { PageContainer } from "../../PageContainer";
import { CreateReview } from "../../Reviews/CreateReview"
import { UpdateReview } from "../../Reviews/UpdateReview"
import { showModal, setCurrentModal } from '../../../store/modal';
import { authenticate } from "../../../store/session";
import { receiveOneBeer } from "../../../store/beer";
import { DeleteReview } from "../../Reviews/DeleteReview";
import defaultProfileImage from "../../../images/default_profile_image.png"
import defaultImage from "../../../images/default_image.png"
import { hideModal } from "../../../store/modal"
import RatingsBar from "../../RatingsBar";
import ReviewCard from "../../Reviews/ReviewCard";
import LikeButton from "../../LikeButton";
import ImageModal from "../../Modal/ImageModal";
import { BeerForm } from "../../../forms/BeerForm";

export const SingleBeer = () => {
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [showMore, setShowMore] = useState(false)
    const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state?.session?.user);

	const { id } = useParams();
	const beer = useSelector((state) => state?.beer)[`${id}`];
    const likeId = sessionUser?.beer_likes[`${id}`]?.id;
    const isLike = sessionUser?.beer_likes?.hasOwnProperty(`${id}`)

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            await dispatch(receiveOneBeer(id))
            setLoaded(true);
        })();
    }, [dispatch, id]);

    if (!loaded) {
        return null;
    }

    let reviewsList;
    let uniqueReviews;
    let recentReviewers;
    let similarBeerList;
    let review_updated_sort;
    let numLikes;


    if (beer) {

        //find reviews list
        reviewsList = Object.values(beer?.reviews)
        //sort reviews by updated_at
        review_updated_sort = reviewsList.sort((a,b) => (new Date(b.updated_at) - new Date(a.updated_at)));


        similarBeerList = Object.values(beer?.similar_beers)

        //find number of unique users that posted reviews
        let reviewerSet = new Set();
        let userImageSet = new Set();
        reviewsList.forEach(review=> {
            reviewerSet.add(review.user_id)
            userImageSet.add(review.user_image)
        })
        uniqueReviews = reviewerSet.size
        recentReviewers = Array.from(userImageSet).slice(0, 12);
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

    const goToBrewery = async (id) => {
        await history.push(`/breweries/${id}`)
    }

    const sendToBeer = (beer_id) => {
        history.push(`/beer/${beer_id}`);
    };


    const imagePreview = (image) => {
        dispatch(setCurrentModal(() => (<ImageModal image={image} />)));
        dispatch(showModal());
    }


    return (
        <PageContainer>
            <div className={styles.page}>
                <div className={styles.left}>
                    <div className={styles.info}>
                        <div className={styles.first_info} >
                            <div className={styles.card_img}>
                                <img src={beer.beer_image} alt="beer" onError={addDefaultImage} onClick={()=>imagePreview(beer.beer_image)}/>
                            </div>
                            <div className={styles.middle}>
                                <h2>{beer.name}</h2>
                                <h4 onClick={() => goToBrewery(beer.brewery_id)}>{beer.brewery_name}</h4>
                                <p>{beer.style}</p>
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
                                    {beer.likes}
                                </div>
                            </div>
                        </div>
                        <div className={styles.second_info}>
                                <div  className={styles.row}>
                                    {beer.abv}% ABV
                                </div>
                                <div className={styles.row}>
                                    {beer.ibu} IBU
                                </div>
                                <div className={styles.row}>
                                    <p><RatingsBar rating={beer.rating} /></p>
                                </div>
                                <div className={styles.row_end}>
                                    {sessionUser ?
                                    <>
                                        <CreateReview beer_id={+id} brewery_id={beer.brewery_id} />
                                        <LikeButton id={+id} type={"beer"} isLike={isLike} likeId={likeId} />
                                    </>
                                    :
                                    <>Sign in to Interact</> }
                                </div>

                        </div>
                        <div>
                            <div className={styles.third_info}>
                                {!showMore && beer.description.length > 150 ?
                                    <div className={styles.show}>
                                        {beer.description.slice(0,150)}...
                                        <div onClick={() => setShowMore(!showMore)}>Show more</div>
                                     </div>
                                    : !showMore && beer.description.length < 150 ?
                                                <div className={styles.show}>{beer.description}</div> :
                                    <div className={styles.show}>
                                        {beer.description}
                                        <div onClick={() => setShowMore(!showMore)}>Show Less</div>
                                    </div> }
                            </div>
                        </div>
                    </div>
                    {reviewsList.length >0 ?
                    <div className={styles.review_container} >
                            {review_updated_sort.map(review => (
                                <ReviewCard review={review} key={review.id}/>
                            ))
                            }
                    </div> :
                    <div className={styles.review_container}>
                        <h2>There are no reviews for this Beer... be the first by clicking the green check above!</h2>
                    </div> }
                </div>
                <div className={styles.right}>
                    <div className={styles.right_container}>
                        <h3>Loyal Drinkers</h3>
                        {recentReviewers.map((user, idx) => (
                            <img key={user} className={styles.loyal_reviewers} src={user} alt='user image' onError={addDefaultImage}/>
                        ))}
                    </div>
                    <div className={styles.right_container}>
                        <h3>Similar Beers</h3>
                        {similarBeerList.length > 0
                        ?
                        <>
                            {similarBeerList.map(beer => (
                                <div key={beer.id} className={styles.beer_link} onClick={() => sendToBeer(beer.id)}>
                                    <img className={styles.right_image} src={beer.beer_image} alt='beer image' onError={addDefaultImage}/>
                                    <div className={styles.text_container}>
                                        <h4>{beer.name}</h4>
                                        <p>{beer.brewery_name}</p>
                                    </div>
                                </div>
                            ))}
                        </>
                        :
                        <h4>There are no similar beers...</h4>
                        }
                    </div>
                </div>
            </div>
        </PageContainer>
    )
};
