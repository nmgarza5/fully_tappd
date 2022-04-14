import React from "react";
import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import styles from "./SingleBrewery.module.css";
// import { receiveOneBrewery } from "../../store/breweries";
import { UpdateBrewery } from "../UpdateBrewery";
import { PageContainer } from "../PageContainer";

export const SingleBrewery = () => {
    // const dispatch = useDispatch
	const sessionUser = useSelector((state) => state?.session?.user);
	const { id } = useParams();
	const brewery = useSelector((state) => state.breweries)[`${id}`];

    let isOwner = false;
	sessionUser && brewery?.owner_id === sessionUser.id
		? (isOwner = true)
		: (isOwner = false);

    return (
        <PageContainer>
            <div>
                {isOwner &&
                <UpdateBrewery brewery={brewery} />
                }
                <div className={styles.card_img}>
                    <img src={brewery.profile_image} alt="brewery" />
                </div>
                <div>
                    {brewery.name}
                </div>
                <div>
                    {brewery.header}
                </div>
                <div>
                    {brewery.description}
                </div>
                <div>
                    {brewery.brewery_type}
                </div>
                <div>
                    {brewery.street}
                </div>
                <div>
                    {brewery.city}
                </div>
                <div>
                    {brewery.postal_code}
                </div>
                <div>
                    {brewery.country}
                </div>
                <div>
                    {brewery.phone}
                </div>
                <div>
                    {brewery.website_url}
                </div>
                <div>
                    {brewery.created_at}
                </div>
            </div>
        </PageContainer>
    )
};
