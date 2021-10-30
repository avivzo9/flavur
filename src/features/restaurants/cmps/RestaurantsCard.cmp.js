import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import star from '../../../../assets/img/star';
import { fontSizes, spacing } from '../../../utils/sizes';

export default function RestaurantsCard({ restaurant = {} }) {
    const { name = 'Some Restaurant', icon, photos = ['https://www.chasinglenscapes.com/wp-content/uploads/2020/06/food-photography-on-the-go-tips.jpg'],
        address = "Some Street", isOpen = true, rating = 4.6, isPermClosed } = restaurant

    const ratingArr = Array.from(new Array(Math.floor(rating)))

    return (
        <View style={styles.container}>
            <Card elevation={5}>
                <Card.Cover source={{ uri: photos[0] }} />
                <View style={styles.cardMainCon}>
                    <View style={styles.cardMain}>
                        <Card.Title style={styles.title} title={name} />
                        <Card.Content>
                            <Paragraph>{address}</Paragraph>
                        </Card.Content>
                    </View>
                    <SvgXml xml={star} width={35} height={35} style={{ marginRight: spacing.md }} />
                </View>
                <View style={styles.contentCon}>
                    <View style={styles.ratingCon}>
                        {ratingArr.map(() => <SvgXml xml={star} width={23} height={23} />)}
                        <Text style={{ fontSize: fontSizes.md }}> {rating}</Text>
                    </View>
                    {isPermClosed ? <Text>Permenantly closed</Text> : <Text style={{ color: isOpen ? 'green' : 'red' }}>{isOpen ? 'Open now' : 'Closed'}</Text>}
                </View>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md
    },
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardMain: {
        width: '90%'
    }
});
