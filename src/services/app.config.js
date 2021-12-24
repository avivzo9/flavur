import { Appearance, Platform } from "react-native"
import RNSettings from "react-native-settings"

export let radius = 0.5

export const isMock = false
export const isDarkMode = Appearance.getColorScheme() === 'dark' ? true : false
export const isAndroid = Platform.OS === "android" ? true : false
export const isLocationOn = async () => await RNSettings.getSetting(RNSettings.LOCATION_SETTING)
export const changeSearchRadius = (newRadius) => radius = newRadius