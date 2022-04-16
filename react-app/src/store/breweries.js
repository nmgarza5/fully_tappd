const CREATED_BREWERY = "/breweries/createdBrewery"
const RECEIVED_BREWERIES = "/breweries/receivedBreweries"
const RECEIVED__ONE_BREWERY = "/breweries/receivedOneBrewery"
const UPDATED_BREWERY = "/breweries/updatedBrewery"
const DELETED_BREWERY = "/breweries/deletedBrewery"

const createdBrewery = (payload) => {
    return {
        type: CREATED_BREWERY,
        payload,
    }
}

const receivedBreweries = (payload) => {
    return {
        type: RECEIVED_BREWERIES,
        payload,
    }
}

const receivedOneBrewery = (payload) => {
    return {
        type: RECEIVED__ONE_BREWERY,
        payload,
    }
}

const updatedBrewery = (payload) => {
    return {
        type: UPDATED_BREWERY,
        payload,
    }
}

const deletedBrewery = (payload) => {
    return {
        type: DELETED_BREWERY,
        payload,
    }
}

export const receiveBreweries = () => async (dispatch) => {
	const res = await fetch("/api/breweries/");
	if (res.ok) {
		const breweries = await res.json();
		dispatch(receivedBreweries(breweries));
		return breweries;
	}
};

export const createBrewery = (data) => async (dispatch) => {
	const res = await fetch("/api/breweries/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const newBrewery = await res.json();
	if (newBrewery.errors) {
		return newBrewery;
	} else {
		dispatch(createdBrewery(newBrewery));
		return newBrewery;
	}
};

export const receiveOneBrewery = (breweryId) => async (dispatch) => {
	const res = await fetch(`/api/breweries/${breweryId}`);
		const brewery = await res.json();
		if (brewery.errors) {
			return brewery
		} else {
			dispatch(receivedOneBrewery(brewery));
			return brewery;
		}
};

export const updateBrewery =
	({ formData, id }) =>
	async (dispatch) => {
		const res = await fetch(`/api/breweries/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const update = await res.json();
		if (update.errors) {
			return update
		} else {
			dispatch(updatedBrewery(update));
			return update;
		}
	};

	export const deleteBrewery = (breweryId) => async (dispatch) => {
		const res = await fetch(`/api/breweries/${breweryId}`, {
			method: "DELETE",
		});
		const removedBrewery = await res.json();
		dispatch(deletedBrewery(removedBrewery));
		return removedBrewery;
	};


const breweriesReducer = (state = {}, action) => {
	let newState = { ...state };

    switch (action.type) {
		case CREATED_BREWERY: {
			newState[action.payload?.id] = action.payload;
			return newState;
		}
		case RECEIVED_BREWERIES: {
			newState = action.payload
			return newState;
		}
		case RECEIVED__ONE_BREWERY: {
			newState[action.payload.id] = action.payload;
			return newState;
		}
		case UPDATED_BREWERY: {
			newState[action.payload?.id] = action.payload;
			return newState;
		}
		case DELETED_BREWERY: {
			delete newState[action.payload.brewery.id];
			return newState;
		}
		default:
			return state;
	}
};

export default breweriesReducer;
