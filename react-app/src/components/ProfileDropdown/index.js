import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ProfileDropdown.module.css";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import defaultProfileImage from "../../images/default_profile_image.png"

const Profile = () => {
	const history = useHistory();
	const dispatch = useDispatch()
	const [showBox, setShowBox] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);


	const goToActivity = () => {
		history.push("/activity");
		setShowBox(false);
		return;
	};

	const goToProfile = () => {
		history.push("/my-profile");
		setShowBox(false);
		return;
	};
	const goToBrewhub= () => {
		history.push("/brewhub");
		setShowBox(false);
		return;
	};
	const goToBreweries = () => {
		history.push("/breweries");
		setShowBox(false);
		return;
	};
	const goToBeer = () => {
		history.push("/beer");
		setShowBox(false);
		return;
	};

	const onLogout = async (e) => {
		history.push("/");
		await dispatch(logout());
	  };

	const addDefaultProfileImage = (e) => {
		e.target.src = defaultProfileImage;
	}


	return (
		<div className={styles.profileOuterContainer}>
			<div className={styles.profileIconContainer} onClick={(() => setShowBox(!showBox))}>
				<img src={sessionUser.profile_image} className={styles.profile_image} onError={addDefaultProfileImage} alt=''/>
			</div>
			{showBox && (
				<div
					className={styles.dropdown}
				>
					<h3>Hello {sessionUser.first_name}!</h3>
					<div role='button' className={styles.button} onClick={goToActivity}> Recent Activity</div>
					<div role='button' className={styles.button} onClick={goToProfile}>My Profile</div>
					{ sessionUser.business_user ? <div role='button' className={styles.button} onClick={goToBrewhub}> Brewhub</div> : null }
					<div role='button' className={styles.button} onClick={goToBreweries}> Breweries</div>
					<div role='button' className={styles.button} onClick={goToBeer}> Beer</div>
					<div role='button' className={styles.button} onClick={onLogout}>Sign Out</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
