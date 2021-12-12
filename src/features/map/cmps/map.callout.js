import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { fontSizes, spacing } from '../../../utils/sizes';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MapCallout({ restaurant }) {
    const { name, photos, opening_hours = false, rating, business_status, place_id } = restaurant
    const isTmpClosed = business_status === "OPERATIONAL" ? true : false
    const ratingArr = Array.from(new Array(Math.floor(rating)))

    return (
        <View style={styles.cardCon}>
            <View style={styles.imgCon}>
                {Platform.OS === 'android' ? <WebView style={styles.img} source={{ uri: restaurant.photos[0] }} />
                    : <Image style={styles.img} source={{ uri: photos[0] }} />}
            </View>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.contentCon}>
                <View style={styles.ratingCon}>
                    {ratingArr.map((_, idx) => <Ionicons key={`star-${place_id}-${idx}`} name={"star"} size={20} color={'#FFBD00'} />)}
                    <Text style={{ fontSize: fontSizes.md }}> {rating}</Text>
                </View>
                <Text style={{ color: opening_hours.open_now ? 'green' : 'red' }}>{opening_hours.open_now && isTmpClosed ? 'Open now' : 'Closed'}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cardCon: {
        paddingTop: 4,
        paddingBottom: 4,
        maxWidth: 225,
        alignItems: 'center',
        borderRadius: 10,
    },
    imgCon: {
        width: 225,
        height: 150,
        borderRadius: 10
    },
    img: {
        width: 225,
        height: 150,
        borderRadius: 10,
    },
    title: {
        padding: spacing.sm,
        color: 'black',
        fontSize: fontSizes.md,
        textAlign: 'center',
    },
    contentCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        paddingBottom: spacing.sm
    },
    ratingCon: {
        flexDirection: 'row'
    },
})