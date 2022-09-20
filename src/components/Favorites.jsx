import { useContext } from "react";
import { AppContext } from "../context";
import { RiDeleteBin2Fill } from "react-icons/ri";

const Favorites = () => {

  const { favorites, selectMeal, removeFromFavorites } = useContext(AppContext);

  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {
            favorites.map((item) => {
              //console.log(favorites)
              const { idMeal, strMealThumb: image, str, strMeal: title } = item;

              return <div key={idMeal} className="favorite-item">
                <img src={image} alt={title} onClick={ () => selectMeal(idMeal, true)} className="favorites-img img" />
                <button className="remove-btn" onClick={()=>removeFromFavorites(idMeal)}><RiDeleteBin2Fill size={15}/></button>
              </div>
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Favorites;