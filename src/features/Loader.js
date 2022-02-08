import React, { useContext } from "react";
import { View } from "react-native";
import { AppConfigContext } from "../services/appConfig/appConfig.context";
import LottieView from 'lottie-react-native';
import { colors } from "../utils/colors";

export default function Loader() {
    const { isDarkMode } = useContext(AppConfigContext)

    return (
        <View style={{ flex: 1, backgroundColor: isDarkMode ? colors.darkMode.dark : colors.darkMode.light }}>
            <LottieView source={require('../assets/loginGif.json')} autoPlay loop />
        </View>
    )
}