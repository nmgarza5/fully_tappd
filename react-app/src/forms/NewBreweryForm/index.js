import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createBrewery, updateBrewery } from "../../store/breweries"
import styles from "./NewBreweryForm.module.css"
import { hideModal } from "../../store/modal"





const NewBreweryForm = () => {


    // const [name, setName] = useState(brewery?.name || "");
    const [name, setName] = useState("");
	const [header, setHeader] = useState("");
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

	// const [errors, setErrors] = useState([]);
	return (
		<div>
			<form>
				<div className={styles.input_container}>
					<label htmlFor="name">Name</label>
					<input
						name="name"
						type="text"
						placeholder="Enter your Brewery's name."
						value={"will be brewey's name"}
						required
						onChange={(e) => setName(e.target.value)}
					></input>
				</div>
				<div className={styles.input_container}>
					<label htmlFor="header">Header</label>
					<input
						name="header"
						type="text"
						placeholder="Catch the people's attention!."
						value={"will be old header name"}
						required
						onChange={(e) => setHeader(e.target.value)}
					></input>
				</div>
				<div className={styles.input_container}>
					<label htmlFor="name">Name</label>
					<input
						name="name"
						type="text"
						placeholder="Enter your Brewery's name."
						value={"will be brewey's name"}
						required
						onChange={(e) => setName(e.target.value)}
					></input>
				</div>
				<div className={styles.input_container}>
					<label htmlFor="name">Name</label>
					<input
						name="name"
						type="text"
						placeholder="Enter your Brewery's name."
						value={"will be brewey's name"}
						required
						onChange={(e) => setName(e.target.value)}
					></input>
				</div>
			</form>
		</div>
	)
}

export default NewBreweryForm
