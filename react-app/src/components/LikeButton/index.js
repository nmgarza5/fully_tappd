import { useDispatch} from "react-redux";
import { useState, useEffect } from "react";
import styles from "./LikeButton.module.css";
import { addBeerLike, removeBeerLike, removeBreweryLike, addBreweryLike } from "../../store/session";
import { receiveOneBeer } from "../../store/beer";
import { receiveOneBrewery } from "../../store/breweries";
import { useHistory } from "react-router-dom";

const LikeButton = ({id, type, isLike, likeId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

	const [likeToggle, setLikeToggle] = useState(null);

    useEffect(()=> {
        setLikeToggle(isLike)
    }, [isLike])

    const [showBox, setShowBox] = useState(false);
    const [message, setMessage] = useState(false);

    const showBoxTimer = () => {
        setShowBox(true)
        setTimeout(() => {setShowBox(false)}, 1500)
    }

    const handleLike = async () => {
		setLikeToggle(!likeToggle);
        console.log("type", type)
        if (type === "beer") {
            if (!likeToggle) {
                showBoxTimer()
                await dispatch(addBeerLike(id));
                await dispatch(receiveOneBeer(id))
            } else {
                showBoxTimer()
                await dispatch(removeBeerLike(likeId));
                await dispatch(receiveOneBeer(id))
            }
        }
        if (type === "brewery") {
            console.log("HIT")
            if (!likeToggle) {
                showBoxTimer()
                await dispatch(addBreweryLike(id));
                await dispatch(receiveOneBrewery(id))
            } else {
                showBoxTimer()
                await dispatch(removeBreweryLike(likeId));
                await dispatch(receiveOneBrewery(id))
            }
        }
	};

    return (
        <div
            className={styles.like_container}
            onClick={handleLike}
        >
            {likeToggle ? (
                <div
                className={styles.like}
                onMouseEnter={() => setMessage(true)}
                onMouseLeave={() => setMessage(false)}
                >
                    <i className="fa-solid fa-beer-mug-empty fa-2x"></i>
                    {message && (
                        <p className={styles.showBox}>
                            Remove Like
                        </p>
                    )}
                    {showBox && (
                        <p className={styles.showBox}>
                            Liked!
                        </p>
                    )}
                </div>
            ) : (
                <div
                    className={styles.no_like}
                    onMouseEnter={() => setMessage(true)}
                    onMouseLeave={() => setMessage(false)}
                >
                    <i className="fa-solid fa-beer-mug-empty fa-2x"></i>
                    {message && (
                        <p className={styles.showBox}>
                            Like this Beer!
                        </p>
                    )}
                    {showBox && (
                        <p className={styles.showBox}>
                        Removed Liked!
                    </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default LikeButton;
