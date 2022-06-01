import React, { useState } from "react"
import { useDispatch} from "react-redux"
import { useHistory } from "react-router-dom"
import { createBeer, updateBeer} from "../../store/beer"
import styles from "./BeerForm.module.css"
import { hideModal } from "../../store/modal"
import { authenticate } from "../../store/session"
import defaultImage from "../../images/default_image.png"

export const BeerForm = ({beer, breweryId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
    const [name, setName] = useState(beer?.name || "");
	const [style, setStyle] = useState(beer?.style || "Pale Ale")
	const [description, setDescription] = useState(beer?.description || "");
	// const [price, setPrice] = useState(beer?.price || "0");
	const [abv, setAbv] = useState(beer?.abv || "0");
	const [ibu, setIbu] = useState(beer?.ibu || "0");
	const [image, setImage] = useState(beer?.beer_image || null);
	console.log("image", image)
    const [imageLoading, setImageLoading] = useState(false);
	const [errors, setErrors] = useState([]);

	// const userBreweries = useSelector((state) => state?.session?.user.breweries);

	const handleClick_Edit = () => {
		dispatch(hideModal());
	};

	const handleClick_New = () => {
		// history.push("/beer");
		dispatch(hideModal());
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
        // const reviewData = {
        //     beer_id,
        //     brewery_id,
        //     rating,
        //     content,
        //     image_url
        // }
        formData.append('name', name)
        formData.append('description', description)
        formData.append('style', style)
        formData.append('abv', abv)
        formData.append('ibu', ibu)
        formData.append('brewery_id', breweryId)
        formData.append('ibu', ibu)
		formData.append('image', image)
        setImageLoading(true);
		console.log("hit", formData.entries)
		if (beer) {
			const id = beer?.id;
			const updateData = { formData, id };
			const updatedBeer = await dispatch(
				updateBeer(updateData)
			);
			if (updatedBeer.errors) {
				setImageLoading(false);
				setErrors(updatedBeer.errors);
			} else {
				await dispatch(authenticate())
				await history.push(`/brewhub`);
				dispatch(hideModal());
			}
		} else {
			const newBeer = await dispatch(createBeer(formData));
			if (newBeer.errors) {
				setImageLoading(false);
				setErrors(newBeer.errors);
			} else {
				await dispatch(authenticate())
				setImageLoading(false);
				dispatch(hideModal());
				history.push(`/beer/${newBeer.id}`);
			}
	};
	}

	const beerChoices = [
		"Altbier", "Amber Ale", "Barley Wine", "Berliner Weisse", "Blonde Ale", "Bock", "Brown Ale", "Cream Ale", "Dopplebock",
		"English Bitter", "English Mild", "Gose", "Gueze", "Hefeweizen", "Helles Bock", "IPA", "Kolsch",
		"Lager", "Lambic", "Oktoberfestbier", "Pale Ale", "Pilsner", "Porter", "Red Ale", "Saison", "Stout", "Witbier",
	]

	const closeModal = () => {
        dispatch(hideModal())
    }

	const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const addDefaultImage = (e) => {
        e.target.src = defaultImage
    }

	return (
			<div className={styles.form_entries}>
				{beer ? <h3 className={styles.beer_header}>Edit: {beer.name} <i className="fa-solid fa-rectangle-xmark" onClick={closeModal}></i></h3>
					: <h3 className={styles.beer_header}>New Beer <i className="fa-solid fa-rectangle-xmark" onClick={closeModal}></i></h3> }
				<ul>
					{errors &&
						errors.map((error) => (
							<li key={error} className={styles.errors}>
								{error.replace("_", " ")}
							</li>
						))}
				</ul>
				<div className={styles.small_text}>All fields below are required.</div>
				<form className={styles.beer_form}>
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
							required
							onChange={(e) => setStyle(e.target.value)}
						>
						{beerChoices.map((style, i) => (
							<option  key={i} value={style}>{style}</option>
						))}
						</select>
					</div>
					{/* </div> */}
					<div className={styles.input_container}>
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							value={description}
							placeholder="Tell us what makes your beer special."
							required
							onChange={(e) =>
								setDescription(e.target.value)
							}
						></textarea>
					</div>
					{/* <div className={styles.input_container}>
						<label htmlFor="price">Price</label>
						<input style={{width: '150px'}} type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
					</div> */}
					<div className={styles.lower_container}>
						<div className={styles.left_container}>
							<div className={styles.input_container}>
								<label htmlFor="price">ABV</label>
								<input style={{width: '150px'}} type="number" value={abv} onChange={(e) => setAbv(e.target.value)}/>
							</div>
							<div className={styles.input_container}>
								<label htmlFor="price">IBUs</label>
								<input style={{width: '150px'}} type="number" value={ibu} onChange={(e) => setIbu(e.target.value)}/>
							</div>
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
	)
}
