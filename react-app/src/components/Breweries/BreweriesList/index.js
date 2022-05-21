import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { PageContainer } from "../../PageContainer";
import styles from "./BreweriesList.module.css";
import defaultImage from "../../../images/default_image.png"
import { receiveBreweries } from "../../../store/breweries";
import { authenticate } from "../../../store/session";


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
				<div className={styles.all_container}>
					{breweries.map((brewery) => (
						<div key={brewery.id} className={styles.infoBrewery}>
							<div className={styles?.first_info} >
								<div className={styles?.card_img}>
									<img src={brewery?.profile_image} alt="brewery" onError={addDefaultImage}/>
								</div>
								<div className={styles.middle}>
									<h2>{brewery?.name}</h2>
									<div className={styles.brewery_link} onClick={() => goToBrewery(brewery.id)}>
										Go To Brewery <i className="fa-solid fa-angle-right"></i>
									</div>
								</div>
								<div>
									<div>{brewery?.street}</div>
									<div>{brewery?.city}, {brewery?.state}</div>
									<div>{brewery?.country}</div>
									<div>Brewery Type - {breweryType(brewery?.brewery_type)}</div>
									<div>{`(${brewery?.phone.slice(
											0,
											3
										)}) ${brewery?.phone.slice(
											3,
											6
										)}-${brewery?.phone.slice(6)}`}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</PageContainer>
	);
};

export default BreweriesList;
