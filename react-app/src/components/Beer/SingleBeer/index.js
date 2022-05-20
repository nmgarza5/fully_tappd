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
import { ReviewForm } from "../../../forms/ReviewForm";

export const SingleBeer = () => {
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [showMore, setShowMore] = useState(false)
    const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state?.session?.user);

	const { id } = useParams();
    // console.log("ID", id)
	const beer = useSelector((state) => state?.beer)[`${id}`];


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
    let similarBeers;


    if (beer) {

        //find reviews list
        reviewsList = Object.values(beer?.reviews)

        //find number of unique users that posted reviews
        let reviewerSet = new Set();
        let userImageSet = new Set();
        reviewsList.forEach(review=> {
            reviewerSet.add(review.user_id)
            userImageSet.add(review.user_image)
        })
        uniqueReviews = reviewerSet.size
        recentReviewers = Array.from(userImageSet).slice(0, 13);
    }

    const userReviews = () => {
        let count = 0;
        reviewsList?.forEach(review => {
            if (review?.user_id === sessionUser?.id) count+=1;
        })
        return count;
    }





    const addDefaultProfileImage = (e) => {
        e.target.src = defaultProfileImage
    }
    const addDefaultImage = (e) => {
        e.target.src = defaultImage
    }

    const goToBrewery = async (id) => {
        await history.push(`/breweries/${id}`)
    }

    const closeModal = () => {
        dispatch(hideModal())
    }

    const ImageModal = ({image}) => {
        return (
            <div>
                <h3 className={styles.image_header}>Image Preview<i className="fa-solid fa-rectangle-xmark" onClick={closeModal}></i></h3>
                <img src={image} alt=""className={styles.image} onError={addDefaultImage}/>
            </div>
        )
    }

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
                                <img src={beer.beer_image} alt="beer" onError={addDefaultImage}/>
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
                                    <p>FAVORITES</p>
                                    # favs
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
                                            <i className="fa-solid fa-star fa-2x"></i>
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
                            {reviewsList.map(review => (
                                <div key={review.id} className={styles.review_item}>
                                    <img src={review.user_image} alt="" className={styles.profile_image} onError={addDefaultProfileImage}></img>
                                    <div className={styles.review_info}>
                                        <div>
                                            <strong className={styles.strong}>{review.user_name}</strong>
                                            is drinking a
                                            <strong className={styles.strong}>{review.beer_name}</strong>
                                            from
                                            <strong className={styles.strong}>{review.brewery_name}</strong>
                                        </div>
                                        <div>
                                            {review.content}
                                        </div>
                                        <div>
                                            <RatingsBar rating={review.rating} />
                                        </div>
                                        <div>
                                            <img src={review.image_url} alt="" className={styles.image_preview} onError={addDefaultImage} onClick={()=>imagePreview(review.image_url)}/>
                                        </div>
                                        <p className={styles.updated_at}>
                                            reviewed on: {review.updated_at.slice(0,16)}
                                        </p>
                                    </div>
                                    <div className={styles.end_container}>
                                        <img src={review.brewery_image} alt="" className={styles.brewery_image} onError={addDefaultImage}></img>
                                        {sessionUser && review.user_id === sessionUser.id &&
                                            <div className={styles.review_buttons}>
                                                <UpdateReview review={review} beer_id={+id} brewery_id={beer.brewery_id} />
                                                <DeleteReview review_id={review.id} beer_id={+id} />
                                            </div>
                                        }
                                    </div>
                                </div>

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
							<img key={idx} className={styles.loyal_reviewers} src={user} alt='user image' onError={addDefaultImage}/>
						))}
					</div>
                </div>
            </div>
        </PageContainer>
    )
};
