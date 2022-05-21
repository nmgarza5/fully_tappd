import styles from "./SearchSection.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { hideModal } from "../../../store/modal";

const SearchSection = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (searchQuery.includes("%")) {
			alert(
				`Please do not use the "percent" symbol in your search query.`
			);
			setSearchQuery("");
		} else if (searchQuery) {
			history.push(`/search/${searchQuery}`);
		} else {
			alert(`Please enter a search query.`);
		}

		dispatch(hideModal());
		return;
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSubmit(e);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.sub_parent}>
				<div>
					<i className="fa-solid fa-magnifying-glass fa-2x"></i>
					<input
						className={styles.search_box_field}
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="Search for Breweries or Beers"
					/>
				</div>
				<div onClick={handleSubmit} className={styles.button}>
					Search
				</div>
			</div>
		</div>
	);
};

export default SearchSection;
