import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import GetLocation from 'react-native-get-location';
import { getLocation } from './location.service';
import { AppConfigContext } from '../appConfig/appConfig.context';

export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {
    const { isMock, isLocation } = useContext(AppConfigContext)
    const [location, setLocation] = useState(null)
    const [isLocationLoading, setIsLocationLoading] = useState(false)
    const [locationError, setLocationError] = useState(null)
    const [isSearch, setIsSearch] = useState(true)
    const [keyword, setKeyword] = useState(isMock ? 'Antwerp' : 'Tel Aviv')

    useEffect(() => {
        initLocation()
    }, [])

    useEffect(() => {
        if (isSearch) {
            if (keyword.length) search()
        }

        return () => setIsSearch(false)
    }, [keyword])

    const initLocation = async (isAlert) => {
        setIsLocationLoading(true)
        if (!isLocation) isAlert ? locationAlert() : null
        else await getCurrLocation()
        setIsLocationLoading(false)
    }

    const getCurrLocation = async () => {
        const location = await GetLocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 15000 })
        if (!location) {
            setIsLocationLoading(false)
            return
        }
        const res = await getCityName(location.latitude, location.longitude)
        setIsSearch(true)
        if (res && res.data) setKeyword(res.data.results[0].formatted_address)
    }

    const locationAlert = () => {
        Alert.alert('Location is off', 'For better experience please turn on your location settings', [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "OK",
                onPress: async () => await GetLocation.openGpsSettings()
            }
        ])
    }

    const getCityName = async (lat, lng) => axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAuViHJowBExdhvmeG93jbLtfd7IB2AHzQ`)

    const onSearch = async (searchTerm) => {
        setIsLocationLoading(true)
        setKeyword(searchTerm)
    }

    const search = async () => {
        getLocation(keyword.toLowerCase(), isMock).then((res) => {
            setLocation(res[0])
            setIsLocationLoading(false)
        }).catch((err) => {
            setLocationError(err)
            setIsLocationLoading(false)
        })
    }

    return (
        <LocationContext.Provider value={{ location, isLocationLoading, onSearch, keyword, locationError, initLocation }}>
            {children}
        </LocationContext.Provider>
    )
}