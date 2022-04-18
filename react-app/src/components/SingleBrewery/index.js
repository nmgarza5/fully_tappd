import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import styles from "./SingleBrewery.module.css";
// import { receiveOneBrewery } from "../../store/breweries";
import { UpdateBrewery } from "../UpdateBrewery";
import { PageContainer } from "../PageContainer";
import { DeleteBrewery } from "../DeleteBrewery";

export const SingleBrewery = () => {
    // const dispatch = useDispatch
	const sessionUser = useSelector((state) => state?.session?.user);
	const { id } = useParams();
	const brewery = useSelector((state) => state.breweries)[`${id}`];
    const [showMore, setShowMore] = useState(false)

    // let type = brewery.brewery_type;
    const breweryType = (type) => {
        if (type === "micro") return "Micro"
        if (type === "brewpub") return "Brewpub"
        if (type === "regional") return "Regional"
        if (type === "large") return "Large"
    }

    // "brewpub" ? "Brewpub" : "regional" ? "Regional" : "large" ? "Large" : null

    let isOwner = false;
	sessionUser && brewery?.owner_id === sessionUser.id
    ? (isOwner = true)
    : (isOwner = false);

    return (
        <PageContainer>
            {/* {isOwner &&
            <>
                <UpdateBrewery brewery={brewery} />
                <DeleteBrewery brewery_id={brewery.id} />
            </>
            } */}
            <div className={styles.page}>
                <div className={styles.left}>
                    <div className={styles.info}>
                        {/* <div style={{backgroundImage: `url(${brewery.banner_image})`}}></div> */}
                        <div className={styles.first_info} >
                            <div className={styles.card_img}>
                                <img src={brewery.profile_image} alt="brewery" />
                            </div>
                            <div className={styles.middle}>
                                <h2>{brewery.name}</h2>
                                <div>{brewery.street}</div>
                                <div>{brewery.city}, {brewery.state}</div>
                                <div>{brewery.country}</div>
                                <div>Brewery Type - {breweryType(brewery.brewery_type)}</div>
                            </div>
                            <div className={styles.end}>
                                <div>Total Checkins</div>
                                <div>Monthly Average</div>
                                <div># of your checkins</div>
                                <div># of Favorites</div>
                            </div>
                        </div>
                        {/* <div> */}
                            <div className={styles.second_info}>
                                {/* <div className={styles.row}> */}
                                    <div  className={styles.row}>
                                        Avg Rating
                                    </div>
                                    <div className={styles.row}>
                                        # of Ratings
                                    </div>
                                    <div className={styles.row}>
                                        # of Beers Available
                                    </div>
                                    <div className={styles.row_end}>
                                        <i className="fa-solid fa-star fa-2x"></i>
                                    </div>
                              {/* </div> */}
                            </div>
                        {/* </div> */}
                        <div>
                            <div className={styles.third_info}>
                                <h3>
                                    {brewery.header}
                                </h3>
                                {!showMore && brewery.description.length > 100 ?
                                    <div className={styles.no_show}>
                                        {brewery.description.slice(0,100)}...
                                        <div onClick={() => setShowMore(!showMore)}>Show more</div>
                                     </div>
                                    :
                                    <div className={styles.show}>
                                        {brewery.description}
                                        <div onClick={() => setShowMore(!showMore)}>Show Less</div>
                                    </div> }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    World
                </div>
            </div>
        </PageContainer>
    )
};
