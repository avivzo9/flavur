import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { Colors } from "react-native-paper";
import { AppConfigContext } from "../services/appConfig/appConfig.context";
import { colors } from "../utils/colors";

export default function Loader() {
    const { isDarkMode } = useContext(AppConfigContext)

    return (
        <ActivityIndicator style={{ flex: 1, backgroundColor: isDarkMode ? colors.darkMode.dark : colors.darkMode.light }} animating={true} size={50} color={Colors.red800} />
    )
}