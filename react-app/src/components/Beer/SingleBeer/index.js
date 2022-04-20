import React from "react";
import { useParams } from "react-router-dom";
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

export const SingleBeer = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state?.session?.user);
	const { id } = useParams();
	const beer = useSelector((state) => state.beer)[`${id}`];

    const reviewsList = Object.values(beer.reviews)

    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            await dispatch(receiveOneBeer(id))
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }
    // const breweryType = (type) => {
    //     if (type === "micro") return "Micro"
    //     if (type === "brewpub") return "Brewpub"
    //     if (type === "regional") return "Regional"
    //     if (type === "large") return "Large"
    // }

    // "brewpub" ? "Brewpub" : "regional" ? "Regional" : "large" ? "Large" : null

    // let isOwner = false;
	// sessionUser && beer?.owner_id === sessionUser.id
    // ? (isOwner = true)
    // : (isOwner = false);




    const imagePreview = () => {
    //     dispatch(setCurrentModal(() => (<img ={brewery_id} beer_id={beer_id}/>));
    //     dispatch(showModal());
    }

    return (
        <PageContainer>
            <div className={styles.page}>
                <div className={styles.left}>
                    <div className={styles.info}>
                        <div className={styles.first_info} >
                            <div className={styles.card_img}>
                                <img src={beer.beer_image} alt="beer" />
                            </div>
                            <div className={styles.middle}>
                                <h2>{beer.name}</h2>
                                <h4>{beer.brewery_name}</h4>
                                <div>{beer.style}</div>
                            </div>
                            <div className={styles.end}>
                                <div>Total Checkins</div>
                                <div>Monthly Average</div>
                                <div># of your checkins</div>
                                <div># of Favorites</div>
                            </div>
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
                                        AVG RATING
                                    </div>
                                    <div className={styles.row_end}>
                                        <CreateReview beer_id={+id} brewery_id={beer.brewery_id} />
                                        <i className="fa-solid fa-star fa-2x"></i>
                                    </div>
                            </div>
                        <div>
                            <div className={styles.third_info}>
                                {!showMore && beer.description.length > 100 ?
                                    <div className={styles.no_show}>
                                        {beer.description.slice(0,100)}...
                                        <div onClick={() => setShowMore(!showMore)}>Show more</div>
                                     </div>
                                    :
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
                                    <img src={sessionUser.profile_image} alt="" className={styles.profile_image}></img>
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
                                            {Object.values(review.images).length > 0 &&
                                                Object.values(review.images).map(image => (
                                                    <img src={image} alt="" className={styles.image_preview} onClick={imagePreview}/>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className={styles.end_container}>
                                        <img src={review.brewery_image} alt="" className={styles.brewery_image}></img>
                                        {review.user_id === sessionUser.id &&
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
                    World
                </div>
            </div>
        </PageContainer>
    )
};
