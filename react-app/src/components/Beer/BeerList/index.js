import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { PageContainer } from "../../PageContainer";
import styles from "./BeerList.module.css";
import { receiveBeer } from "../../../store/beer";
import { authenticate } from "../../../store/session";
import SearchCard from "../../Search/SearchCard";

const BeerList = () => {
    const allBeer = useSelector((state) => Object.values(state.beer))
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





	return (
		<PageContainer>
			<div className={styles.container}>
					{allBeer.map((beer) => (
					<div key={beer.id} className={styles.selected_container} >
						<SearchCard key={beer.id} type={"beer"} content={beer} />
					</div>
					))}

			</div>
		</PageContainer>
	);
};

export default BeerList;
