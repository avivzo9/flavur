import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import GetLocation from 'react-native-get-location';
import { getLocation } from './location.service';
import { AppConfigContext } from '../appConfig/appConfig.context';

export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {
    const { isMock, isLocation, isLocationOn } = useContext(AppConfigContext)
    const [location, setLocation] = useState(null)
    const [isLocationLoading, setIsLocationLoading] = useState(false)
    const [locationError, setLocationError] = useState(null)
    const [isSearch, setIsSearch] = useState(true)
    const [keyword, setKeyword] = useState(isMock ? 'Antwerp' : 'Tel Aviv')

    useEffect(() => {
        initLocation(true)
    }, [isLocation])

    useEffect(() => {
        if (isSearch && keyword.length) search(keyword.toLowerCase())

        return () => setIsSearch(false)
    }, [])

    const initLocation = async (isAlert) => {
        if (!location) return
        await isLocationOn()
        setIsLocationLoading(true)
        if (!isLocation) isAlert ? locationAlert() : null
        else await getCurrLocation()
        setIsLocationLoading(false)
    }

    const search = async (searchTerm) => {
        if (!searchTerm.length) return
        getLocation(searchTerm, isMock).then((res) => {
            if (!res || !res[0]) throw new Error()
            else setLocation(res[0])
            setIsLocationLoading(false)
        }).catch((err) => {
            setLocationError(err)
            setIsLocationLoading(false)
        })
    }

    const getCurrLocation = async () => {
        if (isMock) return
        const location = await GetLocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 15000 })
        if (!location) {
            setIsLocationLoading(false)
            return
        }
        const res = await getCityName(location.latitude, location.longitude)
        setIsSearch(true)
        if (res && res.data) {
            setKeyword(res.data.results[0].formatted_address)
            search(res.data.results[0].formatted_address.toLowerCase())
        }
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
        search(searchTerm.toLowerCase())
    }

    return (
        <LocationContext.Provider value={{ location, isLocationLoading, onSearch, keyword, locationError, initLocation }}>
            {children}
        </LocationContext.Provider>
    )
}