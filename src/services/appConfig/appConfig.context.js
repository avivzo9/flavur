import React, { createContext, useEffect, useState } from "react"
import { Appearance, Platform } from "react-native"
import RNSettings from "react-native-settings"

export const AppConfigContext = createContext()

export const AppConfigContextProvider = ({ children }) => {
    const [searchRadius, setSearchRadius] = useState(0.5)
    const [isMock, setIsMock] = useState(false)
    const [isLocation, setIsLocation] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark' ? true : false)

    const isAndroid = useState(Platform.OS === "android" ? true : false)

    useEffect(() => {
        isLocationOn()
        setIsDarkMode(Appearance.getColorScheme() === 'dark' ? true : false)
    }, [])

    const isLocationOn = async () => {
        const isEnable = await RNSettings.getSetting(RNSettings.LOCATION_SETTING)
        setIsLocation(isEnable === 'ENABLED' ? true : false)
    }

    return (
        <AppConfigContext.Provider
            value={{ isLocationOn, searchRadius, isMock, setIsMock, setIsDarkMode, isDarkMode, isAndroid, isLocation, setSearchRadius }}>
            {children}
        </AppConfigContext.Provider>
    )
}