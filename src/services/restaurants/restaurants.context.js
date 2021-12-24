import React, { createContext, useContext, useEffect, useState } from 'react';
import { LocationContext } from '../location/location.context';
import { getRestaurantDetails, getRestaurants } from './restaurants.service';

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([])
    const [restaurantLoading, setRestaurantLoading] = useState(true)
    const [restaurantError, setRestaurantError] = useState(null)
    const { location } = useContext(LocationContext)

    const retrieveRestaurants = async (loc) => {
        setRestaurantLoading(true)
        getRestaurants(loc).then((res) => {
            setRestaurants(res)
            setRestaurantLoading(false)
        }).catch((err) => {
            setRestaurantError(err)
            setRestaurantLoading(false)
        })
    }

    const searchRestaurantDetails = async (placeId) => {
        try {
            setRestaurantLoading(true)
            const details = await getRestaurantDetails(placeId)
            if (!details) {
                setRestaurantLoading(false)
                Promise.reject('Can\'t find details')
            }
            setRestaurantLoading(false)
            return details.result;
        } catch (err) {
            setRestaurantError(err)
            setRestaurantLoading(false)
        }
    }

    const initContext = () => {
        const { lat, lng } = location.geometry.location
        setRestaurants([])
        const locationStr = `${lat},${lng}`
        retrieveRestaurants(locationStr)
    }

    useEffect(() => {
        if (location) {
            initContext()
        }
    }, [location])

    return (
        <RestaurantsContext.Provider value={{ restaurants, initContext, restaurantLoading, restaurantError, searchRestaurantDetails }}>
            {children}
        </RestaurantsContext.Provider>
    )
}