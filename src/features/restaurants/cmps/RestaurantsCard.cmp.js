import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { spacing } from '../../../utils/sizes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FavoritesContext } from '../../../services/favorites/favorites.context';
import { AppConfigContext } from '../../../services/appConfig/appConfig.context';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

export default function RestaurantsCard({ restaurant, navigation, route, isNavigate, isDetails }) {
    const { favorites, addFavorites, removeFavorites } = useContext(FavoritesContext)
    const { isDarkMode } = useContext(AppConfigContext)
    
    const { name, icon, vicinity, user_ratings_total, opening_hours = false, rating, business_status, place_id } = restaurant
    const isTmpClosed = business_status === "OPERATIONAL" ? true : false
    const ratingArr = rating ? Array.from(new Array(Math.floor(rating))) : null
    const isFavourite = favorites.find((r) => r.place_id === restaurant.place_id)

    const formatUserRating = (rate) => rate.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    return (
        <TouchableOpacity onPress={() => !isNavigate ? navigation.navigate('RestaurantDetails', { restaurant }) : null} activeOpacity={isDetails ? 1 : 0.8} style={styles(isDarkMode, route).container}>
            <Card elevation={5}>
                <View style={{ height: isDetails ? 190 : 130 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => isFavourite ? removeFavorites(restaurant) : addFavorites(restaurant)} style={styles(isDarkMode).favBtn}>
                        <Ionicons name={isFavourite ? "heart" : "heart-outline"} size={28} color={isFavourite ? 'red' : 'white'} />
                    </TouchableOpacity>
                    <Card.Cover style={{ zIndex: 5, height: isDetails ? 190 : 130 }} source={{ uri: restaurant.photos[0] }} />
                </View>
                <View style={styles(isDarkMode).cardMainCon}>
                    <View style={styles().cardMain}>
                        <Text style={[styles().title, styles(isDarkMode).darkModeTxt]}>{name}</Text>
                        <Card.Content>
                            <Paragraph style={[styles().address, styles(isDarkMode).darkModeTxt]}>{vicinity}</Paragraph>
                        </Card.Content>
                    </View>
                    <Image style={{ width: 22, height: 22 }} source={{ uri: icon }} />
                </View>
                <View style={styles(isDarkMode).contentCon}>
                    {(rating && user_ratings_total) && <View style={styles().ratingCon}>
                        {ratingArr.map((_, idx) => <Ionicons key={`star-${place_id}-${idx}`} name={"star"} size={20} color={'#FFBD00'} />)}
                        <Text style={[styles().rating, styles(isDarkMode).darkModeTxt]}> {rating} ({formatUserRating(user_ratings_total)})</Text>
                    </View>}
                    {opening_hours && <Text style={{ color: opening_hours.open_now ? 'green' : 'tomato' }}>{opening_hours.open_now && isTmpClosed ? 'Open now' : 'Closed'}</Text>}
                </View>
            </Card>
        </TouchableOpacity>
    )
};

const styles = (isDark, routeName) => StyleSheet.create({
    container: {
        marginBottom: (routeName === 'RestaurantDetails') ? 0 : spacing.md,
        borderRadius: 10,
    },
    title: {
        fontFamily: fonts.header,
        fontSize: 20,
        padding: spacing.md,
        paddingBottom: 0
    },
    ratingCon: {
        flexDirection: 'row',
    },
    rating: {
        fontSize: spacing.md,
    },
    contentCon: {
        padding: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isDark ? colors.darkMode.topDark : colors.darkMode.light,
    },
    cardMainCon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isDark ? colors.darkMode.topDark : colors.darkMode.light,
    },
    cardMain: {
        width: '90%',
    },
    address: {
        fontFamily: fonts.body
    },
    favBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 9,
        padding: 5
    },
    darkModeTxt: {
        color: isDark ? colors.darkMode.light : colors.darkMode.dark,
        opacity: isDark ? 0.9 : 1
    },
});
