import { Appearance, Platform } from "react-native"

export const isMock = 'false'
export const isDarkMode = Appearance.getColorScheme() === 'dark' ? true : false
export const isAndroid = Platform.OS === "android" ? true : false