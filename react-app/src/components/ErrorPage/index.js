import notfound from "../../images/glass-breaking.jpg";
import { PageContainer } from "../PageContainer";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
	return (
		<PageContainer>
			<div className={styles.error_parent}>
				<div>
					<h1>Page Not Found</h1>
					<img
						src={notfound}
						alt="not found"
						className={styles.error_img}
					></img>
				</div>
			</div>
		</PageContainer>
	);
};

export default ErrorPage;
