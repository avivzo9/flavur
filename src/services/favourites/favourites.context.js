import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/auth.context';

export const FavouritesContext = createContext()

export const FavouritesContextProvider = ({ children }) => {
    const { user } = useContext(AuthContext)
    const [favourites, setFavourites] = useState([])
    const [isSave, setIsSave] = useState(false)
    const KEY = '@favourites'

    useEffect(() => {
        if (user && user.uid) loadFavourites(user.uid)
    }, [user])

    useEffect(() => {
        if (user && user.uid) isSave ? saveFavourites(favourites, user.uid) : setIsSave(true)
    }, [favourites, user])

    const addFavourites = (rest) => setFavourites([...favourites, rest])

    const removeFavourites = (rest) => setFavourites(favourites.filter((x) => x.place_id !== rest.place_id))

    const saveFavourites = async (value, id) => {
        try {
            await AsyncStorage.setItem(KEY + id, JSON.stringify(value))
        } catch (err) {
            console.log('err:', err)
        }
    }

    const loadFavourites = async (id) => {
        try {
            const loadedFav = await AsyncStorage.getItem(KEY + id)
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