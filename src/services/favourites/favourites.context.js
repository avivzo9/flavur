import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const FavouritesContext = createContext()

export const FavouritesContextProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([])
    const KEY = 'favourites'

    useEffect(() => {
        if (!favourites.length) return
        saveFavourites()
    }, [favourites])

    useEffect(() => {
        loadFavourites()
    }, [])

    const addFavourites = (rest) => setFavourites([...favourites, rest])

    const removeFavourites = (rest) => setFavourites(favourites.filter((x) => x.place_id !== rest.place_id))

    const saveFavourites = async (value = favourites) => {
        try {
            await AsyncStorage.setItem(KEY, JSON.stringify(value))
        } catch (err) {
            console.log('err:', err)
        }
    }

    const loadFavourites = async () => {
        try {
            const loadedFav = await AsyncStorage.getItem(KEY)
            if (loadedFav && JSON.parse(loadedFav).length) setFavourites(JSON.parse(loadedFav))
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <FavouritesContext.Provider value={{ favourites, addFavourites, removeFavourites }}>
            {children}
        </FavouritesContext.Provider>
    )
}