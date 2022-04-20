import React, { useState } from "react"
import { useDispatch} from "react-redux"
import { useHistory } from "react-router-dom"
import styles from "./ReviewForm.module.css";
import { createReview } from "../../store/reviews";
import { updateReview } from "../../store/reviews";


export const ReviewForm = ({review, brewery_id, beer_id}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [rating, setRating] = useState(review?.rating || "")
    const [content, setContent] = useState(review?.content || "")
    const [newImage, setNewImage] = useState()
    const [images, setImages] = useState(review?.images || "")
    const [errors, setErrors] = useState([]);

    const addImage = () => {
        let newImages = [...images, newImage]
        setImages(newImages)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const reviewData = {
            beer_id,
            brewery_id,
            rating,
            content,
            images
        }
        console.log("reviewData", reviewData)
        // conditional checking if there is a restaurant already created. If so, send a put request. Else send a post request.
        if (review) {
            const id = review?.id;
            const updateData = { reviewData, id };
            const updatedReview = await dispatch(
                updateReview(updateData)
            );
            if (updatedReview.errors) {
                setErrors(updatedReview.errors);
            } else {
                // await dispatch(authenticate())
                // history.push(`/brewhub`);
                // dispatch(hideModal());
            }
        } else {
            const newReview = await dispatch(createReview(reviewData));
            if (newReview.errors) {
                setErrors(newReview.errors);
            } else {
                // await dispatch(authenticate())
                history.push(`/beer/${beer_id}`);
                // dispatch(hideModal());
            }
        };

        }


    return (
        <div>
            <form className={styles.review_form}>
                 <ul>
					{errors &&
						errors.map((error) => (
							<li key={error} className={styles.error_messages}>
								{error.replace("_", " ")}
							</li>
						))}
				</ul>
                <div className={styles.rating_container}>
                    <label>Rating</label>
                    <select
                        name="rating"
                        value={rating}
                        selected={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                    <option  value={1}>1</option>
                    <option  value={2}>2</option>
                    <option  value={3}>3</option>
                    <option  value={4}>4</option>
                    <option  value={5}>5</option>
                    </select>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="content">Content</label>
                    <textarea
                        name="content"
                        placeholder="How was your beer?"
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <div className={styles.lower_field}>
                    <label>Images</label>
                    <input
                    className={styles.lower_input}
                        type="text"
                        name="header"
                        placeholder="Image Url"
                        onChange={(e) => setNewImage(e.target.value)}
                        ></input>
                    <div className={styles.button} onClick={addImage}>Add Image to Review</div>
                </div>
                <div role='button' onClick={handleSubmit} className={styles.button}>Post Review</div>
            </form>
        </div>
    )
}
