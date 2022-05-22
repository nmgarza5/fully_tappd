import { useSelector, useDispatch} from "react-redux";
import { useState } from "react";
import styles from "./LikeButton.module.css";
import { addBeerLike, removeBeerLike, removeBreweryLike, addBreweryLike } from "../../store/session";

const LikeButton = ({id, type}) => {

    console.log("beer", id, type)
    const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state?.session?.user);

    let isLike;
    let likeId;
    if (type === "beer" ) {
        likeId = sessionUser?.beer_likes[`${id}`]?.id;
        isLike = sessionUser?.beer_likes?.hasOwnProperty(`${id}`)
        console.log("isLike", isLike)
        console.log("property", sessionUser?.beer_likes?.hasOwnProperty(`${id}`))
    }
    if (type === "brewery" ) {
        likeId = sessionUser?.brewery_likes[`${id}`]?.id;
        isLike = sessionUser?.brewery_likes?.hasOwnProperty(`${id}`)
    }
	const [likeToggle, setLikeToggle] = useState(isLike);

    const handleLike = async () => {
		setLikeToggle(!likeToggle);
        if (type === "beer") {
            if (!likeToggle) {
                dispatch(addBeerLike(id));
            } else {
                dispatch(removeBeerLike(likeId));
            }
        }
        if (type === "brewery") {
            if (!likeToggle) {
                dispatch(addBreweryLike(id));
            } else {
                dispatch(removeBreweryLike(likeId));
            }
        }
		// dispatch(
		// 	setCurrentModal(() => <FavoriteMessage favToggle={favToggle} />)
		// );
		// dispatch(showModal());
	};
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
