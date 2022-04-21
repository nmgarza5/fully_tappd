import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "../../../store/modal";
import { deleteReview } from "../../../store/reviews";
import { receiveOneBeer } from "../../../store/beer";
// import { useHistory } from "react-router-dom";
import styles from "./DeleteReviewForm.module.css";

export const DeleteReviewForm = ({ review_id, beer_id }) => {
	const [errors, setErrors] = useState([]);
	const dispatch = useDispatch();
	// const history = useHistory();

	const closeModal = async (e) => {
		e.preventDefault();
		await dispatch(hideModal());
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(deleteReview(review_id));
		await dispatch(receiveOneBeer(beer_id))
		dispatch(hideModal());
		// history.push(`/beer/${beer_id}`)
		setErrors([]);
	};

	return (
		<div className={styles.main_container}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div className={styles.text_container}>
				<h2>Are you sure you want to Delete your Review?</h2>
				<h3>
					This will delete all of its information from our records.
				</h3>
				<div className={styles.button_container}>
					<div onClick={handleSubmit} className={styles.button}>
						Delete
					</div>
					<div onClick={closeModal} className={styles.button}>
						Cancel
					</div>
				</div>
			</div>
		</div>
	);
};
