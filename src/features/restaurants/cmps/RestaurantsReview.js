import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { fontSizes, spacing } from "../../../utils/sizes";
import Ionicons from 'react-native-vector-icons/Ionicons';

let darkMode = null

export default function RestaurantReview({ review, isDarkMode }) {
    const ratingArr = review.rating ? Array.from(new Array(Math.floor(review.rating))) : null

    useEffect(() => {
        darkMode = isDarkMode
    }, [isDarkMode])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.profileCon}>
                    <Image style={styles.profileImg} source={{ uri: review.profile_photo_url }} />
                    <Text style={styles.profileName}>{review.author_name.charAt(0).toUpperCase() + review.author_name.slice(1)}</Text>
                </View>
                <View style={styles.contentCon}>
                    {ratingArr.map((_, idx) => <Ionicons key={`${review.place_id}-${idx}`} name={"star"} size={20} color={'#FFBD00'} />)}
                    <Text style={styles.ratingTxt}> {review.rating}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.reviewTxt}>{review.text}</Text>
                <Text style={styles.reviewTxt}>{review.relative_time_description.charAt(0).toUpperCase() + review.relative_time_description.slice(1)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        color: darkMode ? 'white' : 'black',
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
        color: darkMode ? 'white' : 'black',
        padding: spacing.md,
        paddingLeft: 0,
        fontSize: fontSizes.md
    },
    reviewTxt: {
        color: darkMode ? 'white' : 'black',
        fontSize: fontSizes.md,
        padding: spacing.md,
    },
})
