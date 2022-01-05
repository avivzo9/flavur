import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppConfigContext } from '../appConfig/appConfig.context';
import { LocationContext } from '../location/location.context';
import { getRestaurantDetails, getRestaurants } from './restaurants.service';

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([])
    const [restaurantLoading, setRestaurantLoading] = useState(true)
    const [restaurantError, setRestaurantError] = useState(null)
    const { isMock } = useContext(AppConfigContext)
    const { location } = useContext(LocationContext)
    const { isLocation, searchRadius } = useContext(AppConfigContext)

    const retrieveRestaurants = async (loc) => {
        setRestaurantLoading(true)
        getRestaurants(loc, isMock, searchRadius).then((res) => {
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
    }, [location, isLocation])

    return (
        <RestaurantsContext.Provider value={{ restaurants, initContext, restaurantLoading, restaurantError, searchRestaurantDetails }}>
            {children}
        </RestaurantsContext.Provider>
    )
}