import { Appearance, Platform } from "react-native"
import RNSettings from "react-native-settings"

export const isMock = 'false'
export const isDarkMode = Appearance.getColorScheme() === 'dark' ? true : false
export const isAndroid = Platform.OS === "android" ? true : false
export const isLocationOn = async () => await RNSettings.getSetting(RNSettings.LOCATION_SETTING)