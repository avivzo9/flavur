import React, { useEffect, useState, useContext } from "react";
import { Image, StyleSheet, Text, View, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { colors } from "../../../utils/colors";
import { fontSizes, spacing } from "../../../utils/sizes";

export default function SmallRestCard({ restaurant, navigation, isDarkMode, }) {
    const { removeFavorite } = useContext(FavoritesContext)

    const isTmpClosed = restaurant.business_status === "OPERATIONAL" ? true : false

    const [city, setCity] = useState(null)
    const [address, setAddress] = useState(null)

    useEffect(() => {
        formatAddress(restaurant.vicinity)
    }, [])

    const formatAddress = (address) => {
        if (address.includes(",")) {
            setAddress(address.slice(0, (address.indexOf(',') + 2)))
            setCity(address.slice((address.indexOf(',') + 2)))
        }
    }

    const onLongPress = () => {
        Alert.alert('Remove from favorites?', `This action will remove "${restaurant.name}" from your favorites`, [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: () => removeFavorite(restaurant)
            }
        ])
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails', { restaurant: restaurant })} onLongPress={() => onLongPress()} delayLongPress={300} activeOpacity={0.5} style={[styles().cardCon, { width: 500 }]}>
            <Image style={styles().img} source={{ uri: restaurant.photos[0] }} />
            <View style={styles().content}>
                <Text style={[styles().mainTitle, styles(isDarkMode).darkModeTxt]}>{restaurant.name}</Text>
                {address && <Text style={[styles().title, styles(isDarkMode).darkModeTxt]}>{address}</Text>}
                {city && <Text style={[styles().title, styles(isDarkMode).darkModeTxt]}>{city}</Text>}
                {restaurant.opening_hours && <Text style={[styles().title, styles(isDarkMode).darkModeTxt]}>{restaurant.opening_hours.open_now && isTmpClosed ? 'Open now' : 'Closed'}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = (isDark) => StyleSheet.create({
    cardCon: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: spacing.sm,
        marginBottom: spacing.md,
        borderRadius: 10,
    },
    content: {
        marginLeft: spacing.md,
    },
    mainTitle: {
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
        fontSize: fontSizes.md,
        padding: 4
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        padding: 4,
        width: '100%',
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    darkModeTxt: {
        color: isDark ? colors.darkMode.light : colors.darkMode.dark,
        opacity: isDark ? 0.9 : 1
    },
});
