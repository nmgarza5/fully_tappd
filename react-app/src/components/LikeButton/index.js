import { useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from "react";
import styles from "./LikeButton.module.css";
import { addBeerLike, removeBeerLike, removeBreweryLike, addBreweryLike } from "../../store/session";
import { receiveOneBeer } from "../../store/beer";
import { receiveOneBrewery } from "../../store/breweries";

const LikeButton = ({id, type}) => {

    console.log("beer", id, type)
    const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state?.session?.user);

    let isLike;
    let likeId;
    if (type === "beer" ) {
        likeId = sessionUser?.beer_likes[`${id}`]?.id;
        isLike = sessionUser?.beer_likes?.hasOwnProperty(`${id}`)
        console.log("likeId", likeId)
        console.log("isLike", isLike)
        console.log("property", sessionUser?.beer_likes?.hasOwnProperty(`${id}`))
    }
    if (type === "brewery" ) {
        likeId = sessionUser?.brewery_likes[`${id}`]?.id;
        isLike = sessionUser?.brewery_likes?.hasOwnProperty(`${id}`)
    }
	const [likeToggle, setLikeToggle] = useState(isLike);

    // useEffect(() => {
	// 	return () => {
	// 		setLikeToggle(null);
	// 	};
	// }, [dispatch, id]);

    const handleLike = async () => {
		setLikeToggle(!likeToggle);
        if (type === "beer") {
            if (!likeToggle) {
                await dispatch(addBeerLike(id));
                await dispatch(receiveOneBeer(id))
            } else {
                await dispatch(removeBeerLike(likeId));
                await dispatch(receiveOneBeer(id))
            }
        }
        if (type === "brewery") {
            if (!likeToggle) {
                dispatch(addBreweryLike(id));
                await dispatch(receiveOneBrewery(id))
            } else {
                await dispatch(removeBreweryLike(likeId));
                await dispatch(receiveOneBrewery(id))
            }
        }
		// dispatch(
		// 	setCurrentModal(() => <FavoriteMessage favToggle={favToggle} />)
		// );
		// dispatch(showModal());
	};
    console.log("likeTog", likeToggle)
    return (
        <div
            className={styles.like_container}
            onClick={handleLike}
        >
            {likeToggle ? (
                <div
                className={styles.like}
                >
                    <i className="fa-solid fa-beer-mug-empty fa-2x"></i>
                </div>
            ) : (
                <div
                    className={styles.no_like}
                >
                    <i className="fa-solid fa-beer-mug-empty fa-2x"></i>
                </div>
            )}
        </div>
    )
}

export default LikeButton;
