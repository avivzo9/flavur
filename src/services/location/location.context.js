import React, { createContext, useEffect, useState } from 'react';
import { getLocation } from './location.service';

export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {
    const [location, setLocation] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [locationError, setLocationError] = useState(null)
    const [keyword, setKeyword] = useState('San Francisco')

    const onSearch = async (searchTerm) => {
        setIsLoading(true)
        setKeyword(searchTerm)
    }

    const search = async () => {
        getLocation(keyword.toLowerCase()).then((res) => {
            setLocation(res[0])
            setIsLoading(false)
        }).catch((err) => {
            setLocationError(err)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (!keyword.length) return
        search()
    }, [keyword])

    return (
        <LocationContext.Provider value={{ location, isLoading, onSearch, keyword, locationError }}>
            {children}
        </LocationContext.Provider>
    )
}