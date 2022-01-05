import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/auth.context';

export const FavoritesContext = createContext()

export const FavoritesContextProvider = ({ children }) => {
    const { user } = useContext(AuthContext)
    const [favorites, setFavorites] = useState([])
    const [isSave, setIsSave] = useState(false)
    const KEY = '@favorites'

    useEffect(() => {
        if (user && user.uid) loadFavorites(user.uid)
    }, [user])

    useEffect(() => {
        if (user && user.uid) isSave ? saveFavorites(favorites, user.uid) : setIsSave(true)
    }, [favorites, user])

    const addFavorites = (rest) => setFavorites([...favorites, rest])

    const removeFavorites = (rest) => setFavorites(favorites.filter((x) => x.place_id !== rest.place_id))

    const clearFavorites = () => setFavorites([])

    const saveFavorites = async (value, id) => {
        try {
            await AsyncStorage.setItem(KEY + id, JSON.stringify(value))
        } catch (err) {
            console.log('err:', err)
        }
    }

    const loadFavorites = async (id) => {
        try {
            const loadedFav = await AsyncStorage.getItem(KEY + id)
            if (loadedFav && JSON.parse(loadedFav).length) setFavorites(JSON.parse(loadedFav))
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <FavoritesContext.Provider value={{ favorites, clearFavorites, addFavorites, removeFavorites }}>
            {children}
        </FavoritesContext.Provider>
    )
}