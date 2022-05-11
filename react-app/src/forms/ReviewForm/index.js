import React, { useState } from "react"
import { useDispatch} from "react-redux"
import { useHistory } from "react-router-dom"
import styles from "./ReviewForm.module.css";
import { createReview } from "../../store/reviews";
import { updateReview } from "../../store/reviews";
import { hideModal } from "../../store/modal";
import { receiveOneBeer } from "../../store/beer";
import defaultImage from "../../images/default_image.png"


export const ReviewForm = ({review, brewery_id, beer_id}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [rating, setRating] = useState(review?.rating || 1)
    const [content, setContent] = useState(review?.content || "")
    // const [image_url, setImage] = useState(review?.image_url || "")
    const [image, setImage] = useState(null);
    console.log("IMAGE", image)
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        // const reviewData = {
        //     beer_id,
        //     brewery_id,
        //     rating,
        //     content,
        //     image_url
        // }
        formData.append('beer_id', beer_id)
        formData.append('brewery_id', brewery_id)
        formData.append('rating', rating)
        formData.append('content', content)
        formData.append('image', image)
        console.log("formData", formData)
        setImageLoading(true);

        // conditional checking if there is a restaurant already created. If so, send a put request. Else send a post request.
        if (review) {
            const id = review?.id;
            const updateData = { formData, id };
            // console.log("updateData", updateData)
            const updatedReview = await dispatch(
                updateReview(updateData)
            );
            if (updatedReview.errors) {
                setImageLoading(false);
                setErrors(updatedReview.errors);
            } else {
                await dispatch(receiveOneBeer(beer_id))
                setImageLoading(false);
                history.push(`/beer/${beer_id}`);
                dispatch(hideModal());
            }
        } else {
            const newReview = await dispatch(createReview(formData));
            console.log("newReview", newReview)
            if (newReview.errors) {
                console.log("newReview.errors", newReview.errors)
                setImageLoading(false);
                setErrors(newReview.errors);
            } else {
                // await dispatch(authenticate())
                await dispatch(receiveOneBeer(beer_id))
                setImageLoading(false);
                dispatch(hideModal());
                history.push(`/beer/${beer_id}`);
            }
        };

        }

    // const addDefaultImage = async (e) => {
    //     e.target.src = defaultImage
    // }

    const closeModal = () => {
        dispatch(hideModal())
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
            <form className={styles.review_form}>
                <h3 className={styles.review_header}>Review <i className="fa-solid fa-rectangle-xmark" onClick={closeModal}></i></h3>
                 <ul>
					{errors &&
						errors.map((error) => (
							<li key={error} className={styles.errors}>
								{error.replace("_", " ")}
							</li>
						))}
				</ul>
                <div className={styles.small_text}>All fields below are required.</div>
                <div className={styles.upper_half}>
                    <div className={styles.input_container}>
                        <label>Content
                        </label>
                        <textarea
                            name="content"
                            placeholder="What did you think?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={styles.lower_field}>
                        <label>Image
                        </label>
                        {/* <input
                        className={styles.lower_input}
                            type="text"
                            name="header"
                            placeholder="Your image url"
                            value={image_url}
                            onChange={(e) => setImage(e.target.value)}
                            ></input> */}
                            <input
                                className={styles.lower_input}
                                type="file"
                                accept="image/*"
                                onChange={updateImage}
                                />
                                {(imageLoading)&& <p>Loading...</p>}
                        {/* <div className={styles.images_container}>
                        {image &&
                            <div className={styles.single_image}>
                                <img src={image} alt="" className={styles.image_preview} onError={addDefaultImage}/>
                                <i onClick={() => setImage(null)} className="fa-solid fa-square-minus"></i>
                            </div>
                                }
                                </div> */}
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
