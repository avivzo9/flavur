import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fontSizes, spacing } from "../../../utils/sizes";

export default function FavouritesCard({ favourite, navigation }) {
    const isTmpClosed = favourite.business_status === "OPERATIONAL" ? true : false

    return (
        <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails', { restaurant: favourite })} style={styles.cardCon}>
            <Image style={styles.img} source={{ uri: favourite.photos[0] }} />
            <View style={styles.content}>
                <Text style={styles.mainTitle}>{favourite.name}</Text>
                <Text style={styles.title}>{favourite.vicinity}</Text>
                {favourite.opening_hours && <Text style={styles.title}>{favourite.opening_hours.open_now && isTmpClosed ? 'Open now' : 'Closed'}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardCon: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        padding: spacing.sm,
        paddingBottomBottom: spacing.md
    },
    content: {
        marginLeft: spacing.md,
    },
    mainTitle: {
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
        fontSize: fontSizes.md,
        color: 'black',
        padding: 4
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: 'black',
        padding: 4
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 50
    }
});
