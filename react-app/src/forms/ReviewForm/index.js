import React, { useState } from "react"
import { useDispatch} from "react-redux"
import { useHistory } from "react-router-dom"
import styles from "./ReviewForm.module.css";
import { createReview } from "../../store/reviews";
import { updateReview } from "../../store/reviews";
import { hideModal } from "../../store/modal";
import { receiveOneBeer } from "../../store/beer";


export const ReviewForm = ({review, brewery_id, beer_id}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    let editImages;
    review?.images ? editImages = Object.values(review?.images) : editImages = []

    console.log("EDITimages", editImages)

    const [rating, setRating] = useState(review?.rating || 1)
    const [content, setContent] = useState(review?.content || "")
    const [newImage, setNewImage] = useState()
    const [images, setImages] = useState(editImages)
    const [errors, setErrors] = useState([]);


    const addImage = () => {
        let newImages = [...images, newImage]
        setImages(newImages)
        setNewImage("")
    }

    const removeImage = async (ind) => {
        if (images.length === 1) setImages([])
        else {
            console.log("BEfore", images)
            // const imageIndex = images.indexOf(image)
            let newImages = images.splice(ind, 1)
            editImages = images
            await setImages(images)
            console.log("After images", images)
        }
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

        // conditional checking if there is a restaurant already created. If so, send a put request. Else send a post request.
        if (review) {
            const id = review?.id;
            const updateData = { reviewData, id };
            console.log("updateData", updateData)
            const updatedReview = await dispatch(
                updateReview(updateData)
            );
            if (updatedReview.errors) {
                setErrors(updatedReview.errors);
            } else {
                await dispatch(receiveOneBeer(beer_id))
                history.push(`/beer/${beer_id}`);
                dispatch(hideModal());
            }
        } else {
            const newReview = await dispatch(createReview(reviewData));
            if (newReview.errors) {
                setErrors(newReview.errors);
            } else {
                // await dispatch(authenticate())
                await dispatch(receiveOneBeer(beer_id))
                dispatch(hideModal());
                history.push(`/beer/${beer_id}`);
            }
        };

        }


    return (
            <form className={styles.review_form}>
                <h3>Review</h3>
                 <ul>
					{errors &&
						errors.map((error) => (
							<li key={error} className={styles.error_messages}>
								{error.replace("_", " ")}
							</li>
						))}
				</ul>
                <div className={styles.upper_half}>
                    <div className={styles.input_container}>
                        <textarea
                            name="content"
                            placeholder="What did you think?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={styles.lower_field}>
                        <label>Images
                        </label>
                        <input
                        className={styles.lower_input}
                            type="text"
                            name="header"
                            placeholder="Image Url"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                            ></input>
                            <i className="fa-solid fa-square-plus"  onClick={addImage}></i>
                        <div className={styles.images_container}>
                        {images.length > 0 &&
                            images.map((image, ind) => (
                                <div className={styles.single_image}>
                                    <img key={ind} src={image} alt="" className={styles.image_preview}/>
                                    <i onClick={() => removeImage(ind)} className="fa-solid fa-square-minus"></i>
                                </div>
                                    ))
                                }
                                </div>
                    </div>
                </div>
                <div className={styles.lower_half}>
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
                </div>
                <div role='button' onClick={handleSubmit} className={styles.button}>Confirm</div>
            </form>
    )
}
