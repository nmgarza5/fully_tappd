import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { PageContainer } from "../../PageContainer";
import styles from "./BreweriesList.module.css";
import { receiveBreweries } from "../../../store/breweries";
import { authenticate } from "../../../store/session";
import SearchCard from "../../Search/SearchCard";
import loadingImage from "../../../images/cheers-beer.gif"

const BreweriesList = () => {
    const dispatch = useDispatch();
    const breweries = useSelector((state) => Object.values(state.breweries))
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            await dispatch(receiveBreweries())
			setLoaded(true);
        })();
    }, [dispatch]);


    if (!loaded) {
        return (
			<PageContainer>
				<div className={styles.container}>
					<img src={loadingImage} alt="loading" />
				</div>
			</PageContainer>
		);
    }


	return (
		<PageContainer>
			<div className={styles.container}>
				<div className={styles.selected_container}>
					{breweries.map((brewery) => (
						<SearchCard key={brewery.id} type={"brewery"} content={brewery} />
					))}
				</div>
			</div>
		</PageContainer>
	);
};

export default BreweriesList;
