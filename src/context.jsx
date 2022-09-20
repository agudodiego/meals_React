import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const allMealsUrl = 'https://themealdb.com/api/json/v1/1/search.php?s='
const randomMealsUrl = 'https://themealdb.com/api/json/v1/1/random.php'

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites')
    //console.log(favorites)
    if (favorites){
        favorites = JSON.parse(localStorage.getItem('favorites'))
    }else{
        favorites = []
    }
    return favorites
}

const AppProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [meals, setMeals] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

    const closeModal = () => {
        setShowModal(false)
    }

    const fetchMeals = async (url) => {

        setLoading(true)
        try {
            const response = await axios(url)
            
            if (response.data.meals) {
                setMeals(response.data.meals)                
            }else{
                setMeals([])
            }
            
        } catch (error) {
            console.log(error.response)
        }
        setLoading(false)
    }

    const randomMeal = ()=>{
        fetchMeals(randomMealsUrl)
    }

    const selectMeal = ( idMeal, favoriteMeal )=>{
        let meal
        console.log(favoriteMeal)
        if (favoriteMeal){
            meal = favorites.find( (meal)=> meal.idMeal === idMeal )
        }else{
            meal = meals.find( (meal)=> meal.idMeal === idMeal )
        }
        setSelectedMeal(meal)
        setShowModal(true)
    }

    const addToFavorites = (idMeal)=>{        
        const alreadyFavorite = favorites.find( (meal) => meal.idMeal === idMeal)
        if (alreadyFavorite) return

        const meal = meals.find( (meal) => meal.idMeal === idMeal)
        const updatedFavorites = [...favorites, meal]
        setFavorites(updatedFavorites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

    const removeFromFavorites = (idMeal)=>{
        const updatedFavorites = favorites.filter( (meal) => meal.idMeal !== idMeal)
        setFavorites(updatedFavorites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    useEffect(() => {
        if(!searchTerm) return 
        fetchMeals( `${allMealsUrl}${searchTerm}` )        
    }, [searchTerm])

    return (
        <AppContext.Provider value={{loading, meals, setSearchTerm, randomMeal, showModal, selectedMeal, selectMeal, closeModal, favorites, addToFavorites, removeFromFavorites}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider };