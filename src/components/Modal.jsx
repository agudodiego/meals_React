import { useContext } from "react";
import { AppContext } from "../context";

const Modal = () => {

    const { selectedMeal, closeModal } = useContext(AppContext);

    const { strMealThumb: image, strMeal: title, strInstructions: text, strSource: source } = selectedMeal

    return (
        <aside className="modal-overlay">
            <div className="modal-container">
                <img src={image} alt={title} className="img modal-img" />
                <div className="modal-content">
                    <h4>{title}</h4>
                    <p>Cooking Instruction</p>
                    <p>{text}</p>
                    <a href={source} target="blank">Original Source</a>
                    <button className="btn btn-hipster close-btn" onClick={closeModal}>close</button>
                </div>
            </div>
        </aside>
    )
}

export default Modal;