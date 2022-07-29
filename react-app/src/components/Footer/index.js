import styles from "./Footer.module.css";
import github from "../../company-logos/GitHub.png"
import linkedin from "../../company-logos/LinkedIn.png"

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <section className={styles.links}>
                    <div className={styles.devicons}>
                        <i className="devicon-javascript-plain"></i>
                        <i className="devicon-python-plain-wordmark"></i>
                        <i className="devicon-react-original-wordmark"></i>
                        <i className="devicon-redux-original"></i>
                        <i className="devicon-postgresql-plain"></i>
                        <i class="devicon-flask-original"></i>
                        <i className="devicon-html5-plain-wordmark"></i>
                        <i className="devicon-css3-plain-wordmark"></i>
                        <i className="devicon-heroku-plain"></i>
                    </div>
                </section>
                <hr className={styles.horizontalLine}></hr>
                <div className={styles.descriptions}>FullyTappd is an App Academy project created by:</div>
                    <div className={styles.items_container}>
                        <div className={styles.items}>
                            <p>Nikolas Garza</p>
                            <span>
                                <a href="https://github.com/nmgarza5" rel="noreferrer" target="_blank">
                                    <img src={github} className={styles.github} alt="Link to Nikolas Garza's LinkedIn profile."/>
                                </a>
                                <a href="https://www.linkedin.com/in/nikolas-garza-7a3202139/" rel="noreferrer" target="_blank">
                                    <img src={linkedin} className={styles.linkedin} alt="Link to Nikolas Garza's LinkedIn profile."/>
                                </a>
                            </span>
                        </div>
                    </div>
            </div>
        </footer>
    )
}
