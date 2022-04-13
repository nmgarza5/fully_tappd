import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createBrewery, updateBrewery } from "../../store/breweries"
import styles from "./RestaurantForm.module.css"
import { hideModal } from "../../store/modal"



const NewBreweryForm = () => {
    // const [name, setName] = useState(restaurant?.name || "");
	// const [priceRating, setPriceRating] = useState(
	// 	restaurant?.price_rating || 1
	// );
	// const [description, setDescription] = useState(
	// 	restaurant?.description || ""
	// );
	// const [imageURL, setImageURL] = useState(restaurant?.img_url || "");
	// const [phoneNumber, setPhoneNumber] = useState(
	// 	restaurant?.phone_number || ""
	// );
	// const [website, setWebsite] = useState(restaurant?.website || "");
	// const [streetAddress, setStreetAddress] = useState(
	// 	restaurant?.street_address || ""
	// );
	// const [borough, setBorough] = useState(restaurant?.borough || "Manhattan");
	// const [accessible, setAccessible] = useState("");
	// const [cuisines, setCuisines] = useState([]);
	// const [settings, setSettings] = useState([]);
	// const [errors, setErrors] = useState([]);

}
