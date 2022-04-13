const CREATED_BREWERY = "/breweries/createdBrewery"
const RECEIVED_BREWERIES = "/breweries/receivedBreweries"
const RECEIVED__ONE_BREWERY = "/breweries/receivedOneBrewery"
const UPDATED_BREWERY = "/breweries/updateddBrewery"
const DELETE_BREWERY = "/breweries/deletedBrewery"

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
        type: DELETE_BREWERY,
        payload,
    }
}

export const receiveBreweries = () => async (dispatch) => {
	const res = await fetch("/api/breweries/");
	if (res.ok) {
		const breweries = await res.json();
		dispatch(receivedBreweries(Object.values(breweries)[0]));
		return breweries;
	}
};

// export const receiveOneRestaurant = (restaurantId) => async (dispatch) => {
// 	const res = await fetch(`/api/restaurants/${restaurantId}`);

// 	if (res.ok) {
// 		const restaurant = await res.json();
// 		dispatch(oneRestaurantReceived(restaurant));
// 		return restaurant;
// 	}
// };

const breweriesReducer = (state = {}, action) => {
	const newState = { ...state };

    switch (action.type) {
		case CREATED_BREWERY: {
			newState[action.payload?.id] = action.payload;
			return newState;
		}
		case RECEIVED_BREWERIES: {
			action.payload.forEach(
				(restaurant) => (newState[restaurant.id] = restaurant)
			);
			return newState;
		}
		default:
			return state;
	}
};

export default breweriesReducer;
