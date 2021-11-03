import React, { createContext, useState } from 'react';
import { getLocation } from './location.service';

export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {
    const [location, setLocation] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [keyword, setKeyword] = useState('San Francisco')

    const onSearch = async (searchTerm) => {
        console.log('searchTerm:', searchTerm)
        setKeyword(searchTerm)
        if (!searchTerm.length) return
        setIsLoading(true)
        const { location } = await getLocation(searchTerm.toLowerCase())
        setLocation(location)
        setIsLoading(false)
    }

    return (
        <LocationContext.Provider value={{ location, isLoading, onSearch, keyword }}>
            {children}
        </LocationContext.Provider>
    )
}