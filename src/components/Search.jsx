import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context";
import { RiHome2Fill } from "react-icons/ri";

const Search = () => {

    const { setSearchTerm, randomMeal } = useContext(AppContext);

    const [text, setText] = useState('')

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text) {
            setSearchTerm(text)
        }
    }

    const handleRandomMeals = () => {
        setSearchTerm('')
        setText('')
        randomMeal()
    }

    return (
        <header className="search-container">
            <form onSubmit={handleSubmit}>
                {/* <button type="button" onClick={()=>setSearchTerm(' ')} className="btn"><RiHome2Fill/></button> */}
                <input type="text" placeholder="type favorite meal" value={text} onChange={handleChange} className="form-input" />
                <button type="submit" className="btn">Search</button>
                <button type="button" onClick={handleRandomMeals} className="btn btn-hipster">Surprise me!</button>
            </form>
        </header>
    )
}

export default Search;