import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../utils/colors";
import { fontSizes, spacing } from "../../../utils/sizes";

export default function FavoritesCard({ favourite, navigation, isDarkMode }) {
    const isTmpClosed = favourite.business_status === "OPERATIONAL" ? true : false

    return (
        <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails', { restaurant: favourite })} style={styles().cardCon}>
            <Image style={styles().img} source={{ uri: favourite.photos[0] }} />
            <View style={styles().content}>
                <Text style={[styles().mainTitle, styles(isDarkMode).darkModeTxt]}>{favourite.name}</Text>
                <Text style={[styles().title, styles(isDarkMode).darkModeTxt]}>{favourite.vicinity}</Text>
                {favourite.opening_hours && <Text style={[styles().title, styles(isDarkMode).darkModeTxt]}>{favourite.opening_hours.open_now && isTmpClosed ? 'Open now' : 'Closed'}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = (isDark) => StyleSheet.create({
    cardCon: {
        flex: 1,
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
        padding: 4
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
