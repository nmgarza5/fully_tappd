const CREATED_REVIEW = "/beer/createdReview"
const RECEIVED_REVIEWS = "/beer/receivedReviews"
const RECEIVED__ONE_REVIEW = "/beer/receivedOneReview"
const UPDATED_REVIEW = "/beer/updatedReview"
const DELETED_REVIEW = "/beer/deletedReview"

const createdReview = (payload) => {
    return {
        type: CREATED_REVIEW,
        payload,
    }
}

const receivedReviews = (payload) => {
    return {
        type: RECEIVED_REVIEWS,
        payload,
    }
}

const receivedOneReview = (payload) => {
    return {
        type: RECEIVED__ONE_REVIEW,
        payload,
    }
}

const updatedReview = (payload) => {
    return {
        type: UPDATED_REVIEW,
        payload,
    }
}

const deletedReview = (payload) => {
    return {
        type: DELETED_REVIEW,
        payload,
    }
}

export const receiveReviews = () => async (dispatch) => {
	const res = await fetch("/api/reviews/");
	if (res.ok) {
		const reviews = await res.json();
		dispatch(receivedReviews(reviews));
		return reviews;
	}
};

export const createReview = (formData) => async (dispatch) => {
	const res = await fetch("/api/reviews/", {
		method: "POST",
		// headers: { "Content-Type": "application/json" },
		body: formData,
	});
	const newReview = await res.json();
	if (newReview.errors) {
		return newReview;
	} else {
		dispatch(createdReview(newReview));
		return newReview;
	}
};

export const receiveOneReview = (reviewId) => async (dispatch) => {
	const res = await fetch(`/api/reviews/${reviewId}`);
		const review = await res.json();
		if (review.errors) {
			return review
		} else {
			dispatch(receivedOneReview(review));
			return review;
		}
};

export const updateReview =
	({ formData, id }) =>
	async (dispatch) => {
		console.log("REVIEWDATA---", id, formData)
		const res = await fetch(`/api/reviews/${id}`, {
			method: "PUT",
			// headers: { "Content-Type": "application/json" },
			body: formData,
		});

		const review = await res.json();
		if (review.errors) {
			return review
		} else {
			dispatch(updatedReview(review));
			return review;
		}
	};

	export const deleteReview= (reviewId) => async (dispatch) => {
		// console.log("REVIEWID", reviewId)
		const res = await fetch(`/api/reviews/${reviewId}`, {
			method: "DELETE",
		});
		const removedReview = await res.json();
		// console.log("REMVOED", removedReview)
		dispatch(deletedReview(removedReview));
		return removedReview;
	};


const beerReducer = (state = {}, action) => {
	let newState = { ...state };

    switch (action.type) {
		case CREATED_REVIEW: {
			newState[action.payload?.id] = action.payload;
			return newState;
		}
		case RECEIVED_REVIEWS: {
			newState = action.payload
			return newState;
		}
		case RECEIVED__ONE_REVIEW: {
			newState[action.payload.id] = action.payload;
			return newState;
		}
		case UPDATED_REVIEW: {
			newState[action.payload?.id] = action.payload;
			return newState;
		}
		case DELETED_REVIEW: {
			delete newState[action.payload.beer.id];
			return newState;
		}
		default:
			return state;
	}
};

export default beerReducer;
