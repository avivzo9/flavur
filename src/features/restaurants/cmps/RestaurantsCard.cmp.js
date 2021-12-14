import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { fontSizes, spacing } from '../../../utils/sizes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { isDarkMode } from '../../../services/app.config';

export default function RestaurantsCard({ restaurant, navigation, isNavigate, isDetails }) {
    const { favourites, addFavourites, removeFavourites } = useContext(FavouritesContext)
    const { name, icon, vicinity, user_ratings_total, opening_hours = false, rating, business_status, place_id } = restaurant
    const isTmpClosed = business_status === "OPERATIONAL" ? true : false
    const ratingArr = Array.from(new Array(Math.floor(rating)))
    const isFavourite = favourites.find((r) => r.place_id === restaurant.place_id)

    const formatUserRating = (rate) => rate.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    return (
        <TouchableOpacity onPress={() => !isNavigate ? navigation.navigate('RestaurantDetails', { restaurant }) : null} activeOpacity={isDetails ? 1 : 0.8} style={styles.container}>
            <Card elevation={5}>
                <View style={{ height: isDetails ? 190 : 130 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => isFavourite ? removeFavourites(restaurant) : addFavourites(restaurant)} style={styles.favBtn}>
                        <Ionicons name={isFavourite ? "heart" : "heart-outline"} size={28} color={isFavourite ? 'red' : 'white'} />
                    </TouchableOpacity>
                    <Card.Cover style={{ zIndex: 5, height: isDetails ? 190 : 130 }} source={{ uri: restaurant.photos[0] }} />
                </View>
                <View style={styles.cardMainCon}>
                    <View style={styles.cardMain}>
                        <Text style={styles.title}>{name}</Text>
                        <Card.Content>
                            <Paragraph style={{ fontFamily: 'Lato-Regular' }}>{vicinity}</Paragraph>
                        </Card.Content>
                    </View>
                    <Image style={{ width: 20, height: 20 }} source={{ uri: icon }} />
                </View>
                <View style={styles.contentCon}>
                    <View style={styles.ratingCon}>
                        {ratingArr.map((_, idx) => <Ionicons key={`star-${place_id}-${idx}`} name={"star"} size={20} color={'#FFBD00'} />)}
                        <Text style={{ fontSize: fontSizes.md }}> {rating} ({formatUserRating(user_ratings_total)})</Text>
                    </View>
                    <Text style={{ color: opening_hours.open_now ? 'green' : 'red' }}>{opening_hours.open_now && isTmpClosed ? 'Open now' : 'Closed'}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
        borderRadius: 10
    },
    title: {
        fontFamily: 'Oswald-VariableFont_wght',
        color: isDarkMode ? 'white' : 'black',
        fontSize: 20,
        padding: spacing.md,
        paddingBottom: 0
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
        alignItems: 'center'
    },
    cardMain: {
        width: '90%'
    },
    favBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 9,
        padding: 5
    },
});
