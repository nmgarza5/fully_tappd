import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector} from "react-redux";
import styles from "./SingleBeer.module.css";
import { PageContainer } from "../../PageContainer";

export const SingleBeer = () => {
    // const dispatch = useDispatch
	// const sessionUser = useSelector((state) => state?.session?.user);
	const { id } = useParams();
	const beer = useSelector((state) => state.beer)[`${id}`];
    const [showMore, setShowMore] = useState(false)

    // const breweryType = (type) => {
    //     if (type === "micro") return "Micro"
    //     if (type === "brewpub") return "Brewpub"
    //     if (type === "regional") return "Regional"
    //     if (type === "large") return "Large"
    // }

    // "brewpub" ? "Brewpub" : "regional" ? "Regional" : "large" ? "Large" : null

    // let isOwner = false;
	// sessionUser && beer?.owner_id === sessionUser.id
    // ? (isOwner = true)
    // : (isOwner = false);

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
                                <img src={beer.beer_image} alt="beer" />
                            </div>
                            <div className={styles.middle}>
                                <h2>{beer.name}</h2>
                                <h4>{beer.brewery_name}</h4>
                                <div>{beer.style}</div>
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
                                        {beer.abv}% ABV
                                    </div>
                                    <div className={styles.row}>
                                        {beer.ibu} IBU
                                    </div>
                                    <div className={styles.row}>
                                        AVG RATING
                                    </div>
                                    <div className={styles.row_end}>
                                        <i className="fa-solid fa-star fa-2x"></i>
                                    </div>
                              {/* </div> */}
                            </div>
                        {/* </div> */}
                        <div>
                            <div className={styles.third_info}>
                                {!showMore && beer.description.length > 100 ?
                                    <div className={styles.no_show}>
                                        {beer.description.slice(0,100)}...
                                        <div onClick={() => setShowMore(!showMore)}>Show more</div>
                                     </div>
                                    :
                                    <div className={styles.show}>
                                        {beer.description}
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
