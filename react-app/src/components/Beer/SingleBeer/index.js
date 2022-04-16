import React from "react";
import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import styles from "./SingleBeer.module.css";
// import { receiveOneBrewery } from "../../store/breweries";
import { PageContainer } from "../../PageContainer";
import { DeleteBeer } from "../DeleteBeer";
import { showModal, setCurrentModal } from '../../../store/modal';
import { BeerForm } from "../../../forms/BeerForm";


export const SingleBeer = () => {
    const dispatch = useDispatch()
	const sessionUser = useSelector((state) => state?.session?.user);
	const { id } = useParams();
	const beer = useSelector((state) => state.beer)[`${id}`];

    let isOwner = false;
	sessionUser && beer?.owner_id === sessionUser.id
		? (isOwner = true)
		: (isOwner = false);

    const showBeerForm = () => {
        dispatch(setCurrentModal(() => (<BeerForm beer={beer} />)));
        dispatch(showModal());
        }

    const showDeleteForm = () => {
        dispatch(setCurrentModal(() => (<DeleteBeer beer_id={beer.id} />)));
        dispatch(showModal());
        }

    return (
        <PageContainer>
            <div className={styles.profile_container}>
                {isOwner &&
                <>
                    <div onClick={showBeerForm} className={styles.button}>Update Beer</div>
                    <div onClick={showDeleteForm} className={styles.button}>Delete Beer</div>;
                </>
                }
                <div className={styles.card_img}>
                    <img src={beer.beer_image} alt="beer" />
                </div>
                <div>
                    {beer.name}
                </div>
                <div>
                    {beer.brewery_name}
                </div>
                <div>
                    {beer.description}
                </div>
                <div>
                    {beer.abv}
                </div>
                <div>
                    {beer.ibu}
                </div>
            </div>
        </PageContainer>
    )
};
