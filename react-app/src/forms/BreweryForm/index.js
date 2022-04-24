import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createBrewery, updateBrewery} from "../../store/breweries"
import styles from "./BreweryForm.module.css"
import { hideModal } from "../../store/modal"
import { authenticate } from "../../store/session"

export const BreweryForm = ({brewery}) => {
	const dispatch = useDispatch();
	const history = useHistory();
    const [name, setName] = useState(brewery?.name || "");
	const [header, setHeader] = useState(brewery?.header || "");
	const [description, setDescription] = useState(brewery?.description || "");
	const [brewery_type, setBreweryType] = useState(brewery?.brewery_type || "micro")
	const [street, setStreet] = useState(brewery?.street || "");
	const [city, setCity] = useState(brewery?.city || "");
	const [state, setState] = useState(brewery?.state || "");
	const [postal_code, setPostalCode] = useState(brewery?.postal_code || "");
	const [country, setCountry] = useState(brewery?.country || "");
	const [phone, setPhone] = useState(brewery?.phone || "");
	// const [website_url, setWebsiteUrl] = useState(brewery?.website_url || "");
	const [profile_image, setProfileImage] = useState(brewery?.profile_image || "");
	// const [banner_image, setBannerImage] = useState(brewery?.banner_image || "");
	const [errors, setErrors] = useState([]);


	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = {
			name,
			header,
			description,
			brewery_type,
			street,
			city,
			state,
			postal_code,
			country,
			phone,
			// website_url,
			profile_image
		}

		// !name
		// 	? setErrors(["Please provide your Brewery name."])
		// 	: !profile_image
		// 	? setErrors(["Please provide a url for your image."])
		// 	: !phone
		// 	? setErrors(["Please provide your phone number."])
		// 	: !street
		// 	? setErrors(["Please provide your street address."])
		// 	: setErrors([]);

		// conditional checking if there is a restaurant already created. If so, send a put request. Else send a post request.
		if (brewery) {
			const id = brewery?.id;
			const updateData = { formData, id };
			const updatedBrewery = await dispatch(
				updateBrewery(updateData)
			);
			if (updatedBrewery.errors) {
				setErrors(updatedBrewery.errors);
			} else {
				await dispatch(authenticate())
				dispatch(hideModal());
			}
		} else {
			const newBrewery = await dispatch(createBrewery(formData));
			if (newBrewery.errors) {
				setErrors(newBrewery.errors);
			} else {
				await dispatch(authenticate())
				history.push(`/brewhub`);
			}
		};
	}

	const handleClick_Edit = () => {
		dispatch(hideModal());
	};

	const handleClick_New = () => {
		history.push("/breweries");
		dispatch(hideModal());
	};

	return (
		<div className={styles.container}>
			{!brewery && <h1 className={styles.header}>Create Your New Brewery</h1>}
			<div className={styles.form_entries}>
				<ul>
					{errors &&
						errors.map((error) => (
							<li key={error} className={styles.errors}>
								{error.replace("_", " ")}
							</li>
						))}
				</ul>
				<form>
				<div className={styles.small_text}>All fields below are required.</div>
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
						{/* <Select
							value = {brewery_types.value}
							options = {brewery_types}
							defaultValue={brewery_types[0]}
							onChange={(e) => setBreweryType(e.target.value)}
							/> */}
						<select
							name="brewery_type"
							value={brewery_type}
							selected={brewery_type}
							onChange={(e) => setBreweryType(e.target.value)}
						>
							<option value="micro">micro</option>
							<option value="brewpub">brewPub</option>
							<option value="regional">regional</option>
							<option value="large">large</option>
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
						<label htmlFor="state">State</label>
						<input
							name="state"
							type="text"
							placeholder="What state are you in?."
							value={state}
							required
							onChange={(e) => setState(e.target.value)}
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
							placeholder="Please enter 5 digit. Example: 94124"
							required
							onChange={(e) =>
								setPostalCode(e.target.value)
							}
						></input>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="country">Country</label>
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
						<label htmlFor="phone">
							Phone Number
						</label>
						<input
							type="text"
							name="phone"
							value={phone}
							placeholder="Please enter 10 numbers. No special characters."
							required
							onChange={(e) => setPhone(e.target.value)}
						></input>
					</div>
					{/* <div className={styles.input_container}>
						<label htmlFor="website_url">Website</label>
						<input
							type="text"
							name="website_url"
							value={website_url}
							placeholder="Enter your website's name."
							onChange={(e) => setWebsiteUrl(e.target.value)}
						></input>
					</div> */}
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
					{/* <div className={styles.input_container}>
						<label htmlFor="banner_image">Banner Image</label>
						<input
							type="banner_image"
							name="banner_image"
							placeholder='Image format must be ".jpg" ".jpeg" or ".png" or ".gif".'
							value={banner_image}
							onChange={(e) =>
								setBannerImage(e.target.value)
							}
						></input>
					</div> */}
					<div className={styles.button_container}>
						<div onClick={onSubmit} className={styles.button}>
							Submit
						</div>
						{brewery ? (
							<div
								onClick={handleClick_Edit}
								className={styles.button}
							>
								Cancel
							</div>
						) : (
						<div
							onClick={handleClick_New}
							className={styles.button}
						>
							Cancel
						</div>

						 )}
					</div>
				</form>
			</div>
		</div>
	)
}

// export default BreweryForm
