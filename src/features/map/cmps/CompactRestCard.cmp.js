import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { fontSizes, spacing } from '../../../utils/sizes';

export default function CompactRestCard({ restaurant }) {
    const { name, opening_hours, business_status } = restaurant
    const isTmpClosed = business_status === "OPERATIONAL" ? true : false

    return (
        <View style={styles.container}>
            <Card elevation={5}>
                <Card.Cover style={styles.img} source={{ uri: restaurant.photos[0] }} />
                <View style={styles.cardMainCon}>
                    <View style={styles.cardMain}>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                </View>
                <View style={styles.contentCon}>
                    <Text style={{ color: opening_hours.open_now ? 'green' : 'red' }}>{opening_hours.open_now && isTmpClosed ? 'Open now' : 'Closed'}</Text>
                </View>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 120,
        marginRight: 10,
        marginBottom: 10
    },
    img: {
        width: '100%',
        height: 130,
    },
    contentCon: {
        padding: spacing.md,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardMainCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardMain: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Oswald-VariableFont_wght',
        color: 'black',
        fontSize: fontSizes.md,
        textAlign: 'center'
    },
});
