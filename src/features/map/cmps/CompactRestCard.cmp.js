import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { fontSizes, spacing } from '../../../utils/sizes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mockImages } from '../../../services/restaurants/mock';

export default function CompactRestCard({ restaurant }) {
    const { name, icon, photos, vicinity, opening_hours = false, rating, business_status, place_id } = restaurant
    restaurant.photos = photos.map((p) => mockImages[Math.ceil(Math.random() * mockImages.length - 1)])
    const isTmpClosed = business_status === "OPERATIONAL" ? true : false
    const ratingArr = Array.from(new Array(Math.floor(rating)))

    return (
        <View>
            <Card elevation={5}>
                <Card.Cover source={{ uri: restaurant.photos[0] }} />
                <View style={styles.cardMainCon}>
                    <View style={styles.cardMain}>
                        <Card.Title style={styles.title} title={name} />
                    </View>
                </View>
                <View style={styles.contentCon}>
                    <View style={styles.ratingCon}>
                        {ratingArr.map((_, idx) => <Ionicons key={`star-${place_id}-${idx}`} name={"star"} size={20} color={'#FFBD00'} />)}
                        <Text style={{ fontSize: fontSizes.md }}> {rating}</Text>
                    </View>
                    <Text style={{ color: opening_hours.open_now ? 'green' : 'red' }}>{opening_hours.open_now && isTmpClosed ? 'Open now' : 'Closed'}</Text>
                </View>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Oswald-VariableFont_wght',
    },
    ratingCon: {
        flexDirection: 'row'
    },
    contentCon: {
        padding: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardMainCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardMain: {
        width: '90%',
        alignItems: 'center',
    }
});
