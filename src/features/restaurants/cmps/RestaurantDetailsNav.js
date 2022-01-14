import React from "react";
import { Image, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../../../utils/colors";
import { spacing } from "../../../utils/sizes";

const mapsIcon = require('../../../assets/icons/google_maps_icon.png')
const wazeIcon = require('../../../assets/icons/waze_icon.png')

export default function RestaurantDetailsNav({ restaurant, isDarkMode, navigation }) {

    return (
        <View style={styles(isDarkMode).navCon}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles(isDarkMode).iconBtn} activeOpacity={0.8}>
                <Ionicons name='arrow-back' size={28} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(restaurant.url)} style={styles(isDarkMode).mapsBtn} activeOpacity={0.8}>
                <Image style={styles(isDarkMode).navImg} source={mapsIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(`https://www.waze.com/ul?ll=${restaurant.geometry.location.lat}%2C${restaurant.geometry.location.lng}&navigate=yes&zoom=17`)} style={styles(isDarkMode).wazeBtn} activeOpacity={0.8}>
                <View style={styles(isDarkMode).wazeInnerView}>
                    <Image style={styles().navImg} source={wazeIcon} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(restaurant.website)} style={styles(isDarkMode).iconBtn} activeOpacity={0.8}>
                <Ionicons name='link' size={28} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${restaurant.formatted_phone_number}`)} style={styles(isDarkMode).iconBtn} activeOpacity={0.8}>
                <Ionicons name='call' size={28} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} />
            </TouchableOpacity>
        </View>
    )
}

const styles = (isDark) => StyleSheet.create({
    navCon: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        flexDirection: 'row',
        backgroundColor: isDark ? colors.darkMode.dark : colors.darkMode.light
    },
    iconBtn: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: isDark ? colors.darkMode.topDark : colors.darkMode.light,
        opacity: isDark ? 0.9 : 1
    },
    mapsBtn: {
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 5,
    },
    wazeBtn: {
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 5,
    },
    wazeInnerView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 13,
        backgroundColor: '#33CCFF'
    },
    navImg: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
})
