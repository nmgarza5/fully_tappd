import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { PageContainer } from "../../PageContainer";
import styles from "./BreweriesList.module.css";
import { receiveBreweries } from "../../../store/breweries";
import { authenticate } from "../../../store/session";
import SearchCard from "../../Search/SearchCard";


const BreweriesList = () => {
    const dispatch = useDispatch();
    const breweries = useSelector((state) => Object.values(state.breweries))


	useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            await dispatch(receiveBreweries())
        })();
    }, [dispatch]);

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
