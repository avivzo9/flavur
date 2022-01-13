import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { fontSizes, spacing } from "../../../utils/sizes";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../../../utils/colors";
import { Divider } from "react-native-paper";

export default function RestaurantReview({ review, isDarkMode }) {
    const ratingArr = review.rating ? Array.from(new Array(Math.floor(review.rating))) : null

    return (
        <View style={styles(isDarkMode).container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles().profileCon}>
                    <Image style={styles().profileImg} source={{ uri: review.profile_photo_url }} />
                    <Text style={[styles().profileName, styles(isDarkMode).darkModeTxt]}>{review.author_name.charAt(0).toUpperCase() + review.author_name.slice(1)}</Text>
                </View>
                <View style={styles().contentCon}>
                    {ratingArr.map((_, idx) => <Ionicons key={`${review.place_id}-${idx}`} name={"star"} size={20} color={'#FFBD00'} />)}
                    <Text style={[styles().ratingTxt, styles(isDarkMode).darkModeTxt]}> {review.rating}</Text>
                </View>
            </View>
            <View>
                <Text style={[styles().reviewTxt, styles(isDarkMode).darkModeTxt, { opacity: isDarkMode ? 0.7 : 1 }]}>{review.text}</Text>
                <Text style={[styles().reviewTxt, styles(isDarkMode).darkModeTxt, { opacity: isDarkMode ? 0.6 : 1 }]}>{review.relative_time_description.charAt(0).toUpperCase() + review.relative_time_description.slice(1)}</Text>
            </View>
            <Divider />
        </View>
    )
}

const styles = (isDark) => StyleSheet.create({
    container: {
        backgroundColor: isDark ? colors.darkMode.topDark : colors.darkMode.light
    },
    profileCon: {
        width: '50%',
        padding: spacing.md,
        paddingRight: 0,
        alignItems: 'center',
        flexDirection: 'row'
    },
    profileImg: {
        width: 45,
        height: 45,
        marginRight: spacing.md,
    },
    profileName: {
        fontWeight: "bold",
        fontSize: fontSizes.md
    },
    contentCon: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    ratingTxt: {
        padding: spacing.md,
        paddingLeft: 0,
        fontSize: fontSizes.md
    },
    reviewTxt: {
        fontSize: fontSizes.md,
        padding: spacing.md,
    },
    darkModeTxt: {
        color: isDark ? colors.darkMode.light : colors.darkMode.dark,
        opacity: isDark ? 0.9 : 1
    },
})
