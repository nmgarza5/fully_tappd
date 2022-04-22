import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { PageContainer } from "../../PageContainer";
import styles from "./BeerList.module.css";
import defaultImage from "../../../images/default_image.png"
import { receiveBeer } from "../../../store/beer";
import { authenticate } from "../../../store/session";


const BeerList = () => {
    const history = useHistory()
	// const dispatch = useDispatch()
    const allBeer = useSelector((state) => Object.values(state.beer))
	// const createBeer = () => history.push('/new-beer')
	const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

	useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            await dispatch(receiveBeer())
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

	const goToBeer = (id) => {
		history.push(`/beer/${id}`);
		return;
	};

	const addDefaultImage = (e) => {
        e.target.src = defaultImage
    }



	return (
		<PageContainer>
			<div className={styles.container}>
				<div className={styles.all_container}>
					{allBeer.map((beer) => (
						<div
							onClick={() => goToBeer(beer.id)}
							className={styles.each_container}
							key={beer.id}
						>
							<div className={styles.card_img}>
								<img src={beer.beer_image} alt="beer" onError={addDefaultImage}/>
							</div>
							<div className={styles.info}>
								<h3>
									{beer?.name?.length > 20
										? beer?.name?.slice(0, 20) + "..."
										: beer?.name}
								</h3>
								<p>{beer.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</PageContainer>
	);
};

export default BeerList;
