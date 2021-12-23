import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import GetLocation from 'react-native-get-location';
import { getLocation } from './location.service';
import RNSettings from 'react-native-settings';
import { isLocationOn } from '../app.config';

export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {
    const [location, setLocation] = useState(null)
    const [isLocationLoading, setIsLocationLoading] = useState(false)
    const [locationError, setLocationError] = useState(null)
    const [keyword, setKeyword] = useState('Tel Aviv')

    useEffect(() => {
        initLocation()
    }, [])

    useEffect(() => {
        if (keyword.length) search()
    }, [keyword])

    const initLocation = async () => {
        setIsLocationLoading(true)
        const isLocation = await isLocationOn()
        if (isLocation != RNSettings.ENABLED) locationAlert()
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
        getLocation(keyword.toLowerCase()).then((res) => {
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