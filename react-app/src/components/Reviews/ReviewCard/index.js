import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { showModal, setCurrentModal } from '../../../store/modal';
import defaultProfileImage from "../../../images/default_profile_image.png"
import defaultImage from "../../../images/default_image.png"
import RatingsBar from "../../RatingsBar";
import { UpdateReview } from "../UpdateReview"
import { DeleteReview } from "../DeleteReview"
import styles from "./ReviewCard.module.css"
import { useHistory } from "react-router-dom";
import ImageModal from "../../Modal/ImageModal";


const ReviewCard = ({review}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state?.session?.user);


    const addDefaultProfileImage = (e) => {
        e.target.src = defaultProfileImage
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
        <div key={review.id} className={styles.review_item}>
            <img src={review.user_image} alt="" className={styles.profile_image} onError={addDefaultProfileImage}></img>
            <div className={styles.review_info}>
                <div>
                    <strong className={styles.strong}>{review.user_name}</strong>
                    is drinking a
                    <strong className={styles.strong} onClick={() => sendToBeer(review.beer_id)}>{review.beer_name}</strong>
                    from
                    <strong className={styles.strong} onClick={() => goToBrewery(review.brewery_id)}>{review.brewery_name}</strong>
                </div>
                <div>
                    {review.content}
                </div>
                <div>
                    <RatingsBar rating={review.rating} />
                    <img src={review.image_url} alt="" className={styles.image_preview} onError={addDefaultImage} onClick={()=>imagePreview(review.image_url)}/>
                </div>
                {/* <div>
                </div> */}
                <p className={styles.updated_at}>
                    reviewed on: {review.updated_at.slice(0,16)}
                </p>
            </div>
            <div className={styles.end_container}>
                <img src={review.beer_image} alt="" className={styles.image_preview} onError={addDefaultImage}  onClick={()=>imagePreview(review.beer_image)}></img>
                {sessionUser && review.user_id === sessionUser.id &&
                    <div className={styles.review_buttons}>
                        <UpdateReview review={review} beer_id={review.beer_id} brewery_id={review.brewery_id} />
                        <DeleteReview review_id={review.id} beer_id={review.beer_id} />
                    </div>
                }
            </div>
        </div>
    )
}

export default ReviewCard;
