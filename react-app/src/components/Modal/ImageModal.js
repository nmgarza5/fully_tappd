import styles from "./ImageModal.module.css"
import defaultImage from "../../images/default_image.png"
import { hideModal } from "../../store/modal"
import { useDispatch } from "react-redux"

const ImageModal = ({image}) => {
    const dispatch = useDispatch();
    const addDefaultImage = (e) => {
        e.target.src = defaultImage
    }

    const closeModal = () => {
        dispatch(hideModal())
    }

    return (
        <div>
            <h3 className={styles.image_header}>
                Image Preview
                <i className="fa-solid fa-rectangle-xmark" onClick={closeModal}></i>
            </h3>
            <img src={image} alt="" className={styles.image} onError={addDefaultImage}/>
        </div>
    )
}

export default ImageModal
