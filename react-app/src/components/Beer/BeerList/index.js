import React from "react";
import { useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { PageContainer } from "../../PageContainer";
import styles from "./BeerList.module.css";
import defaultImage from "../../../images/default_image.png"


const BeerList = () => {
    const history = useHistory()
	// const dispatch = useDispatch()
    const allBeer = useSelector((state) => Object.values(state.beer))
	const createBeer = () => history.push('/new-beer')

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
					Beer Page
					<div role='button' onClick={createBeer} className={styles.button}>
						Create New Beer
					</div>
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
