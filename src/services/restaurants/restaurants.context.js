import React, { createContext, useContext, useEffect, useState } from 'react';
import { LocationContext } from '../location/location.context';
import { getRestaurants } from './restaurants.service';

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { location } = useContext(LocationContext)

    const retrieveRestaurants = async (loc) => {
        setIsLoading(true)
        setTimeout(async () => {
            setRestaurants(await getRestaurants(loc))
            setIsLoading(false)
        }, 2000)
    }

    useEffect(() => {
        if (location) {
            const { lat, lng } = location.geometry.location
            setRestaurants([])
            const locationStr = `${lat},${lng}`
            retrieveRestaurants(locationStr)
        }
    }, [location])

    return (
        <RestaurantsContext.Provider value={{ restaurants, isLoading }}>
            {children}
        </RestaurantsContext.Provider>
    )
}