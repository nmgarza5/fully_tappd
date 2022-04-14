import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createBrewery, updateBrewery } from "../../store/breweries"
import styles from "./NewBreweryForm.module.css"
import { hideModal } from "../../store/modal"





const NewBreweryForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();

    // const [name, setName] = useState(brewery?.name || "");

    const [name, setName] = useState("");

	const [header, setHeader] = useState("");
	const [description, setDescription] = useState("");
	const [brewery_type, setBreweryType] = useState("Micro")
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [postal_code, setPostalCode] = useState("");
	const [country, setCountry] = useState("");
	const [phone_number, setPhoneNumber] = useState("");
	const [website_url, setWebsiteUrl] = useState("");
	const [profile_image, setProfileImage] = useState("");


	const [errors, setErrors] = useState([]);

	const handleClick_New = () => {
		dispatch(hideModal());
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = {
			name,
			header,
			description,
			brewery_type,
			street,
			city,
			postal_code,
			country,
			phone_number,
			website_url,
			profile_image
		}

		!name
			? setErrors(["Please provide your Brewery name."])
			: !profile_image
			? setErrors(["Please provide a url for your image."])
			: !phone_number
			? setErrors(["Please provide your phone number."])
			: !street
			? setErrors(["Please provide your street address."])
			: setErrors([]);

		// conditional checking if there is a restaurant already created. If so, send a put request. Else send a post request.
		// if (brewery) {
		// 	const id = brewery?.id;
		// 	const updateData = { formData, id };
		// 	const updatedRestaurant = await dispatch(
		// 		updateBrewery(updateData)
		// 	);
		// 	if (updatedBrewery.errors) {
		// 		setErrors(updatedBrewery.errors);
		// 	} else {
		// 		dispatch(hideModal());
		// 	}
		// } else {
			const newBrewery = await dispatch(createBrewery(formData));
			if (newBrewery.errors) {
				setErrors(newBrewery.errors);
			} else {
				history.push(`/breweries/${newBrewery.id}`);
			}
	};


	return (
		<div className={styles.container}>
			<div className={styles.form_entries}>
				<h2>Brewery Information</h2>
				<ul>
					{errors &&
						errors.map((error) => (
							<li key={error} className={styles.error_messages}>
								{error.replace("_", " ")}
							</li>
						))}
				</ul>
				<form>
					<div className={styles.input_container}>
						<label htmlFor="name">Name</label>
						<input
							name="name"
							type="text"
							placeholder="Enter your Brewery's name."
							value={name}
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
							value={header}
							required
							onChange={(e) => setHeader(e.target.value)}
						></input>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							value={description}
							placeholder="Tell us what makes your brewery special."
							onChange={(e) =>
								setDescription(e.target.value)
							}
						></textarea>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="brewery_type">Brewery Type</label>
						<select
							name="brewery_type"
							value={brewery_type}
							selected={brewery_type}
							onChange={(e) => setBreweryType(e.target.value)}
						>
							<option value="micro">Micro</option>
							<option value="brewpub">BrewPub</option>
							<option value="regional">Regional</option>
							<option value="large">Large</option>
						</select>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="street">
							Street Address
						</label>
						<input
							type="text"
							name="street"
							value={street}
							placeholder="Example: 342 E 6th St, 10003"
							required
							onChange={(e) =>
								setStreet(e.target.value)
							}
						></input>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="city">City</label>
						<input
							name="city"
							type="text"
							placeholder="What city are you in?."
							value={city}
							required
							onChange={(e) => setCity(e.target.value)}
						></input>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="postal_code">
							Zip Code
						</label>
						<input
							type="text"
							name="postal_code"
							value={postal_code}
							placeholder="Example: 94124-3221"
							required
							onChange={(e) =>
								setPostalCode(e.target.value)
							}
						></input>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="country">County</label>
						<input
							name="country"
							type="text"
							placeholder="What country are you in?."
							value={country}
							required
							onChange={(e) => setCountry(e.target.value)}
						></input>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="phone_number">
							Phone Number
						</label>
						<input
							type="text"
							name="phone_number"
							value={phone_number}
							placeholder="Please enter 10 numbers. No special characters."
							required
							onChange={(e) => setPhoneNumber(e.target.value)}
						></input>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="website_url">Website</label>
						<input
							type="text"
							name="website_url"
							value={website_url}
							placeholder="Enter your website's name."
							onChange={(e) => setWebsiteUrl(e.target.value)}
						></input>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="profile_image">Profile Image</label>
						<input
							type="profile_image"
							name="profile_image"
							placeholder='Image format must be ".jpg" ".jpeg" or ".png" or ".gif".'
							value={profile_image}
							required
							onChange={(e) =>
								setProfileImage(e.target.value)
							}
						></input>
					</div>
					<div className={styles.button_container}>
						<div onClick={onSubmit} className={styles.button}>
							Submit
						</div>
						{/* {brewery ? (
							<div
								onClick={handleClick_Edit}
								className={styles.button}
							>
								Cancel
							</div>
						) : ( */}
						<div
							onClick={handleClick_New}
							className={styles.button}
						>
							Cancel
						</div>

						{/* )} */}
					</div>
				</form>
			</div>
		</div>
	)
}

export default NewBreweryForm
