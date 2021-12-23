import React, { createContext, useContext, useEffect, useState } from 'react';
import { LocationContext } from '../location/location.context';
import { getRestaurantDetails, getRestaurants } from './restaurants.service';

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [restaurantError, setRestaurantError] = useState(null)
    const { location } = useContext(LocationContext)

    const retrieveRestaurants = async (loc) => {
        setIsLoading(true)
        getRestaurants(loc).then((res) => {
            setRestaurants(res)
            setIsLoading(false)
        }).catch((err) => {
            setRestaurantError(err)
            setIsLoading(false)
        })
    }

    const searchRestaurantDetails = async (placeId) => {
        try {
            setIsLoading(true)
            const details = await getRestaurantDetails(placeId)
            if (!details) {
                setIsLoading(false)
                Promise.reject('Can\'t find details')
            }
            setIsLoading(false)
            return details.result;
        } catch (err) {
            setRestaurantError(err)
            setIsLoading(false)
        }
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
        <RestaurantsContext.Provider value={{ restaurants, isLoading, restaurantError, searchRestaurantDetails }}>
            {children}
        </RestaurantsContext.Provider>
    )
}