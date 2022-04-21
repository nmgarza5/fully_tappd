// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const CREATED_BREWERY = "/session/createdBrewery"
const RECEIVED_BREWERY = "/session/receivedBrewery"
const UPDATED_BREWERY = "/session/updatedBrewery"
const DELETED_BREWERY = "/session/deletedBrewery"

const createdBrewery = (payload) => {
    return {
        type: CREATED_BREWERY,
        payload,
    }
}

const receivedBrewery = (payload) => {
    return {
        type: RECEIVED_BREWERY,
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

export const receiveUserBrewery = () => async (dispatch) => {
	const res = await fetch("/api/breweries/my-brewery");
	if (res.ok) {
		const myBrewery = await res.json();
		dispatch(receivedBrewery(myBrewery));
		return myBrewery;
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


const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

const removeUser = () => ({
    type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
    const response = await fetch("/api/auth/", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setUser(data));
    }
};

export const login = (username, password) => async (dispatch) => {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        // console.log("D DATA", data)
        dispatch(setUser(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        // console.log("DATeerrs", data)
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        dispatch(removeUser());
    }
};

export const signUp = (userData) => async (dispatch) => {
    // console.log("userDATA --", userData)
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (response.ok) {
        const data = await response.json();
        const newUser = await dispatch(setUser(data));
        return newUser;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export default function reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case REMOVE_USER:
            return { user: null };
        case CREATED_BREWERY: {
            newState.user.breweries[action.payload?.id] = action.payload;
            return newState;
        }
        case RECEIVED_BREWERY: {
            newState.user.breweries[action.payload.id] = action.payload
            return newState;
        }
        case UPDATED_BREWERY: {
            newState.user.breweries[action.payload?.id] = action.payload;
            return newState;
        }
        case DELETED_BREWERY: {
            delete newState.user.breweries.[action.payload.brewery.id];
            return newState;
        }
        default:
            return state;
    }
}
