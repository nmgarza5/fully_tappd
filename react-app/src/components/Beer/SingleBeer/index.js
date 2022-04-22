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

export const SingleBeer = () => {
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [showMore, setShowMore] = useState(false)
    const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state?.session?.user);

	const { id } = useParams();
    console.log("ID", id)
	const beer = useSelector((state) => state?.beer)[`${id}`];


    useEffect(() => {
        (async () => {
            console.log("HELLO FIRST")
            await dispatch(authenticate());
            console.log("HELLO", id)
            await dispatch(receiveOneBeer(id))
            setLoaded(true);
        })();
    }, [dispatch, id]);

    if (!loaded) {
        return null;
    }

    let reviewsList;

     console.log("BEER", beer)

    if (beer) {
        reviewsList = Object.values(beer?.reviews)
    }


    const avgRating = () => {
        let sum = 0;
        reviewsList.forEach(review => sum += review.rating)
        let avg = sum / reviewsList.length;
        if (avg) return `${avg.toFixed(2)}/5`
        else return "No Ratings"
    }

    // const userReviews = () => {
    //     let count = 0;
    //     reviewsList?.forEach(review => {
    //         if (review?.user_id === sessionUser?.id) count+=1;
    //     })
    //     return count;
    // }





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
                <img src={image} alt="" style={{ height : 500 }} onError={addDefaultImage}/>
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
                                <div>{beer.style}</div>
                            </div>
                            {/* <div className={styles.end}>
                                <div>Total Reviews: {reviewsList.length}</div>
                                <div>Monthly Average</div>
                                {sessionUser && <div># of your Reviews: {userReviews()}</div> }
                                <div># of Favorites</div>
                            </div> */}
                        </div>
                            <div className={styles.second_info}>
                                {/* <div className={styles.row}> */}
                                    <div  className={styles.row}>
                                        {beer.abv}% ABV
                                    </div>
                                    <div className={styles.row}>
                                        {beer.ibu} IBU
                                    </div>
                                    <div className={styles.row}>
                                        Rating: {avgRating()}
                                    </div>
                                    <div className={styles.row_end}>
                                       {sessionUser ?
                                        <>
                                            Leave a Review:
                                            <CreateReview beer_id={+id} brewery_id={beer.brewery_id} />
                                        </>
                                        :
                                        <>Sign in to Review</> }
                                        {/* <i className="fa-solid fa-star fa-2x"></i> */}
                                    </div>
                            </div>
                        <div>
                            <div className={styles.third_info}>
                                {!showMore && beer.description.length > 150 ?
                                    <div className={styles.no_show}>
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
                                            {review.user_name} is drinking a {review.beer_name} from {review.brewery_name}
                                        </div>
                                        <div>
                                            Rating: {review.rating}/5
                                        </div>
                                        <div>
                                            {review.content}
                                        </div>
                                        <div>
                                            <img src={review.image_url} alt="" className={styles.image_preview} onError={addDefaultImage} onClick={()=>imagePreview(review.image_url)}/>
                                        </div>
                                    </div>
                                    <div className={styles.end_container}>
                                        <img src={review.brewery_image} alt="" className={styles.brewery_image} onError={addDefaultImage}></img>
                                        {sessionUser && review.user_id === sessionUser.id &&
                                            <div className={styles.review_buttons}>
                                                <UpdateReview review={review} beer_id={+id} brewery_id={beer.brewery_id} />
                                                <DeleteReview review_id={review.id} beer_id={+id} />
                                            </div>
                                        }
                                        {/* <div>
                                            posted: {review.created_at}
                                        </div> */}
                                    </div>
                                </div>

                            ))
                            }
                    </div> :
                    <div className={styles.review_container}>
                        <h2>There are no reviews for this Beer... be the first by clicking the green check above!</h2>
                    </div> }
                </div>
                {/* <div className={styles.right}>
                    World
                </div> */}
            </div>
        </PageContainer>
    )
};
