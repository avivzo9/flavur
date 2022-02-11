import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const image = require('../../../assets/background-imgs/account_img.jpg')

export default function BackgroundImgView({ children }) {
    return (
        <View>
            <ImageBackground style={styles.container} source={image} resizeMode="cover">
                {children}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    }
})