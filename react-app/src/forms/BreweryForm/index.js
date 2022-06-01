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
	const [image, setImage] = useState(brewery?.profile_image || null);
    const [imageLoading, setImageLoading] = useState(false);
	const [errors, setErrors] = useState([]);


	const onSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('name', name)
		formData.append('header', header)
		formData.append('description', description)
		formData.append('brewery_type', brewery_type)
		formData.append('street', street)
		formData.append('city', city)
		formData.append('state', state)
		formData.append('postal_code', postal_code)
		formData.append('country', country)
		formData.append('phone', phone)
		formData.append('image', image)


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

	const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

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
					<div className={styles.small_text}>All fields below are required.</div>
					<div className={styles.upper_input_container}>
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
					<div className={styles.textareas}>
						<div className={styles.upper_input_container}>
							<label htmlFor="header">Header</label>
							<textarea
								name="header"
								type="text"
								placeholder="Catch the people's attention!"
								value={header}
								required
								onChange={(e) => setHeader(e.target.value)}
							></textarea>
						</div>
						<div className={styles.upper_input_container}>
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
					</div>
					<div className={styles.lower}>
						<div className={styles.left}>
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
									placeholder="What city are you in?"
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
									placeholder="What state are you in?"
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
									placeholder="Please enter 5 digits. Example: 94124"
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
									placeholder="What country are you in?"
									value={country}
									required
									onChange={(e) => setCountry(e.target.value)}
								></input>
							</div>
						</div>
						<div className={styles.right}>
							<div className={styles.input_container}>
								<label htmlFor="brewery_type">Brewery Type</label>
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
								<label htmlFor="phone">
									Phone Number
								</label>
								<input
									type="text"
									name="phone"
									value={phone}
									placeholder="10 numbers. No special characters."
									required
									onChange={(e) => setPhone(e.target.value)}
								></input>
							</div>
							<div className={styles.input_container}>
								<label>Image</label>
									<input
										className={styles.lower_input}
										type="file"
										accept="image/*"
										onChange={updateImage}
										/>
									{image && <p className={styles.image_text}> Select a new photo if you wish to change your previous selection.</p> }
									{(imageLoading)&& <p>Loading...</p>}
							</div>
						</div>
					</div>
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
			</div>
		</div>
	)
}
