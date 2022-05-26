import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { PageContainer } from "../../PageContainer";
import styles from "./BreweriesList.module.css";
import defaultImage from "../../../images/default_image.png"
import { receiveBreweries } from "../../../store/breweries";
import { authenticate } from "../../../store/session";
import SearchCard from "../../Search/SearchCard";


const BreweriesList = () => {
    const history = useHistory()
	// const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const breweries = useSelector((state) => Object.values(state.breweries))


	useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            await dispatch(receiveBreweries())
            // setLoaded(true);
        })();
    }, [dispatch]);

    // if (!loaded) {
    //     return null;
    // }

	const breweryType = (type) => {
        if (type === "micro") return "Micro"
        if (type === "brewpub") return "Brewpub"
        if (type === "regional") return "Regional"
        if (type === "large") return "Large"
    }


	const goToBrewery = (id) => {
		history.push(`/breweries/${id}`);
		return;
	};

	const addDefaultImage = (e) => {
        e.target.src = defaultImage
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
