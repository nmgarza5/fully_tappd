// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const ADD_BEER_LIKE = "session/ADD_BEER_LIKE";
const REMOVE_BEER_LIKE = "session/REMOVE_BEER_LIKE";
const ADD_BREWERY_LIKE = "session/ADD_BREWERY_LIKE";
const REMOVE_BREWERY_LIKE = "session/REMOVE_BREWERY_LIKE";

const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

const removeUser = () => ({
    type: REMOVE_USER,
});

const addedBeerLike = (newLike) => ({
	type: ADD_BEER_LIKE,
	payload: newLike,
});

const removedBeerLike = (removedLike) => ({
	type: REMOVE_BEER_LIKE,
	payload: removedLike,
});

const addedBreweryLike = (newLike) => ({
	type: ADD_BREWERY_LIKE,
	payload: newLike,
});

const removedBreweryLike = (breweryId) => ({
	type: REMOVE_BREWERY_LIKE,
	payload: breweryId,
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
        dispatch(setUser(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
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

export const signUp = (formData) => async (dispatch) => {

    console.log("formData", formData.get("username"))
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        body: formData,
    });
    console.log("response", response)
    if (response.ok) {
        const data = await response.json();
        const newUser = await dispatch(setUser(data));
        return newUser;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            // console.log("data.ERRORS", data.errors)
            return data
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const addBeerLike = (id) => async (dispatch) => {
	const res = await fetch("/api/likes/beer_likes", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(id),
	});
	const newLike = await res.json();
	dispatch(addedBeerLike(newLike));
	return newLike;
};

export const removeBeerLike = (id) => async (dispatch) => {
	const res = await fetch("/api/likes/beer_likes", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(id),
	});
	const like = await res.json();
	dispatch(removedBeerLike(like));
	return like;
};

export const addBreweryLike = (id) => async (dispatch) => {
	const res = await fetch("/api/likes/brewery_likes", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(id),
	});
	const newLike = await res.json();
	dispatch(addedBreweryLike(newLike));
	return newLike;
};

export const removeBreweryLike = (data) => async (dispatch) => {
	const res = await fetch("/api/likes/brewery_likes", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const breweryId = await res.json();
	dispatch(removedBreweryLike(breweryId));
	return breweryId;
};

export default function reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case REMOVE_USER:
            return { user: null };
        case ADD_BEER_LIKE:
            newState.user.beer_likes[action.payload.beer_id] =
                action.payload;
            return newState;
        case REMOVE_BEER_LIKE:
            delete newState.user.beer_likes[action.payload.beer_id];
            return newState;
        case ADD_BREWERY_LIKE:
            newState.user.brewery_likes[action.payload.brewery_id] =
                action.payload;
            return newState;
        case REMOVE_BREWERY_LIKE:
            delete newState.user.brewery_likes[action.payload];
            return newState;
        default:
            return state;
    }
}
