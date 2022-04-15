import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createBeer, updateBeer} from "../../store/beer"
import styles from "./BeerForm.module.css"
import { hideModal } from "../../store/modal"

export const BeerForm = ({beer}) => {
	const dispatch = useDispatch();
	const history = useHistory();
    const [name, setName] = useState(beer?.name || "");
	const [style, setStyle] = useState(beer?.style || "Pale Ale")
	const [description, setDescription] = useState(beer?.description || "");
	const [price, setPrice] = useState(beer?.price || "0");
	const [abv, setAbv] = useState(beer?.abv || "0");
	const [ibu, setIbu] = useState(beer?.ibu || "0");
	const [errors, setErrors] = useState([]);

	const handleClick_Edit = () => {
		dispatch(hideModal());
	};

	const handleClick_New = () => {
		history.push("/");
		dispatch(hideModal());
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = {
			name,
			description,
			style,
			price,
			abv,
			ibu,
		}

		!name
			? setErrors([...errors, "Please provide your beer name."])
			: !price
			? setErrors([...errors, "Please provide your price."])
			: setErrors([]);

		// conditional checking if there is a restaurant already created. If so, send a put request. Else send a post request.
		if (beer) {
			const id = beer?.id;
			const updateData = { formData, id };
			const updatedBeer = await dispatch(
				updateBeer(updateData)
			);
			if (updatedBeer.errors) {
				setErrors(updatedBeer.errors);
			} else {
				dispatch(hideModal());
			}
		} else {
			const newBeer = await dispatch(createBeer(formData));
			if (newBeer.errors) {
				setErrors(newBeer.errors);
			} else {
				dispatch(hideModal());
				history.push(`/beer/${newBeer.id}`);
			}
	};
	}

	const beerChoices = [
		"Altbier", "Amber Ale", "Barley Wine", "Berliner Weisse", "Blonde Ale", "Bock", "Brown Ale", "Cream Ale", "Dopplebock",
		"English Bitter", "English Mild", "Gose", "Gueze", "Hefeweizen", "Helles Bock", "India Pale Ale", "Kolsch",
		"Lager", "Lambic", "Oktoberfestbier", "Pale Ale", "Pilsner", "Porter", "Red Ale", "Saison", "Stout", "Witbier",
	]


	return (
		<div className={styles.container}>
			<div className={styles.form_entries}>
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
							placeholder="Enter your beer's name."
							value={name}
							required
							onChange={(e) => setName(e.target.value)}
						></input>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="style">Beer Style</label>
						<select
							name="style"
							value={style}
							selected={style}
							onChange={(e) => setStyle(e.target.value)}
						>
						{beerChoices.map((style, i) => (
							<option  key={i} value={style}>{style}</option>
						))}
						</select>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							value={description}
							placeholder="Tell us what makes your beer special."
							onChange={(e) =>
								setDescription(e.target.value)
							}
						></textarea>
					</div>
					<div className={styles.input_container}>
						<label htmlFor="price">Price</label>
						<input style={{width: '150px'}} type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
					</div>
					<div className={styles.button_container}>
						<div onClick={onSubmit} className={styles.button}>
							Submit
						</div>
						{beer ? (
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
