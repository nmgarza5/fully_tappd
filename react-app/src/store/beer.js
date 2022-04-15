const CREATED_BEER = "/beer/createdBeer"
const RECEIVED_BEER = "/beer/receivedBeer"
const RECEIVED__ONE_BEER = "/beer/receivedOneBeer"
const UPDATED_BEER = "/beer/updatedBeer"
const DELETED_BEER = "/beer/deletedBeer"

const createdBeer = (payload) => {
    return {
        type: CREATED_BEER,
        payload,
    }
}

const receivedBeer = (payload) => {
    return {
        type: RECEIVED_BEER,
        payload,
    }
}

const receivedOneBeer = (payload) => {
    return {
        type: RECEIVED__ONE_BEER,
        payload,
    }
}

const updatedBeer = (payload) => {
    return {
        type: UPDATED_BEER,
        payload,
    }
}

const deletedBeer = (payload) => {
    return {
        type: DELETED_BEER,
        payload,
    }
}

export const receiveBeer = () => async (dispatch) => {
	const res = await fetch("/api/beer/");
	if (res.ok) {
		const beer = await res.json();
		console.log("BEER --", beer)
		console.log("BEER OBJECT --", Object.values(beer)[0])
		dispatch(receivedBeer(beer));
		return beer;
	}
};

export const createBeer = (data) => async (dispatch) => {
	const res = await fetch("/api/beer/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const newBeer = await res.json();
	if (newBeer.errors) {
		return newBeer;
	} else {
		dispatch(createdBeer(newBeer));
		return newBeer;
	}
};

export const receiveOneBeer = (beerId) => async (dispatch) => {
	const res = await fetch(`/api/beer/${beerId}`);
		const beer = await res.json();
		if (beer.errors) {
			return beer
		} else {
			dispatch(receivedOneBeer(beer));
			return beer;
		}
};

export const updateBeer =
	({ formData, id }) =>
	async (dispatch) => {
		const res = await fetch(`/api/beer/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const beer = await res.json();
		if (beer.errors) {
			return beer
		} else {
			dispatch(updatedBeer(beer));
			return beer;
		}
	};

	export const deleteBeer = (beerId) => async (dispatch) => {
		const res = await fetch(`/api/beer/${beerId}`, {
			method: "DELETE",
		});
		const removedBeer = await res.json();
		dispatch(deletedBeer(removedBeer));
		return removedBeer;
	};


const beerReducer = (state = {}, action) => {
	let newState = { ...state };

    switch (action.type) {
		case CREATED_BEER: {
			newState[action.payload?.id] = action.payload;
			return newState;
		}
		case RECEIVED_BEER: {
			newState = action.payload
			return newState;
		}
		case RECEIVED__ONE_BEER: {
			newState[action.payload.id] = action.payload;
			return newState;
		}
		case UPDATED_BEER: {
			newState[action.payload?.id] = action.payload;
			return newState;
		}
		case DELETED_BEER: {
			delete newState[action.payload.beer.id];
			return newState;
		}
		default:
			return state;
	}
};

export default beerReducer;
