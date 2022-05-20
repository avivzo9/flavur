import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FavoritesContext } from '../../../services/favorites/favorites.context';
import { AppConfigContext } from '../../../services/appConfig/appConfig.context';
import { colors } from '../../../utils/colors';
import { spacing } from '../../../utils/sizes';
import { fonts } from '../../../utils/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import ImageLoad from 'react-native-image-placeholder';

export default function RestaurantCard({ restaurant, navigation, route, isDetails, scrollRef }) {
    const { favorites, addFavorites, removeFavorites } = useContext(FavoritesContext)
    const { isDarkMode } = useContext(AppConfigContext)

    const { name, vicinity, user_ratings_total, opening_hours, rating, business_status, place_id } = restaurant
    const isTmpClosed = business_status === "OPERATIONAL" ? true : false
    const ratingArr = rating ? Array.from(new Array(Math.floor(rating))) : null
    const isFavourite = favorites.find((r) => r.place_id === restaurant.place_id)

    const formatUserRating = (rate) => rate.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    return (
        <View style={styles(isDarkMode, false, route).container}>
            <Card elevation={5} borderRadius={15} style={{ borderRadius: 15 }}>
                <View style={styles(isDarkMode, isDetails).cover}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => isFavourite ? removeFavorites(restaurant) : addFavorites(restaurant)} style={styles(isDarkMode).favBtn}>
                        <Ionicons name={isFavourite ? "heart" : "heart-outline"} size={28} color={isFavourite ? 'red' : 'white'} />
                    </TouchableOpacity>
                    {restaurant.photos.length > 1 ?
                        <ScrollView showsHorizontalScrollIndicator={false} ref={scrollRef ? scrollRef : null} width='96%' horizontal={true} style={styles(isDarkMode).coverImgCon}>
                            {restaurant.photos.map((photo, idx) =>
                                // <Image style={[styles().coverImg, { width: isDetails ? 200 : 140 }]} key={`${photo}-${idx}`} source={{ uri: photo }} />
                                <ImageLoad
                                    borderRadius={10}
                                    isShowActivity={true}
                                    key={`${photo}-${idx}`}
                                    source={{ uri: photo }}
                                    style={[styles().coverImg, { width: isDetails ? 200 : 140 }]}
                                />
                            )}
                        </ScrollView> :
                        // One image:
                        <ImageLoad source={{ uri: restaurant.photos[0] }} style={[styles().coverImg, { width: '95%', height: 114.2 }]} />}
                </View>
                <TouchableOpacity onPress={() => isDetails ? null : navigation.navigate('RestaurantDetails', { restaurant })} activeOpacity={isDetails ? 1 : 0.95}>
                    <View style={styles(isDarkMode).cardMain}>
                        <Text style={[styles().title, styles(isDarkMode).darkModeTxt]}>{name}</Text>
                        <Text style={[styles().address, styles(isDarkMode).darkModeTxt]}>{vicinity}</Text>
                    </View>
                    <View style={styles(isDarkMode, isDetails).contentCon}>
                        {(rating && user_ratings_total) && <View style={styles().ratingCon}>
                            {ratingArr.map((_, idx) => <Ionicons key={`star-${place_id}-${idx}`} name={"star"} size={20} color={'#FFBD00'} />)}
                            <Text style={[styles().rating, styles(isDarkMode).darkModeTxt]}> {rating} ({formatUserRating(user_ratings_total)})</Text>
                        </View>}
                        {opening_hours && <Text style={{ color: opening_hours.open_now ? 'white' : 'tomato' }}>{opening_hours.open_now && isTmpClosed ? 'Open now' : 'Closed'}</Text>}
                    </View>
                </TouchableOpacity>
            </Card>
        </View>
    )
};

const styles = (isDark, isDetails, routeName) => StyleSheet.create({
    container: {
        marginBottom: (routeName === 'RestaurantDetails') ? 0 : spacing.md,
    },
    title: {
        fontFamily: fonts.header,
        fontSize: 20,
    },
    cover: {
        justifyContent: 'center',
        alignItems: 'center',
        height: isDetails ? 190 : 130,
        backgroundColor: isDark ? colors.darkMode.topDark : colors.darkMode.light,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    coverImgCon: {
        zIndex: 5,
        height: '100%',
        marginRight: 4,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
        borderTopLeftRadius: 10,
        backgroundColor: isDark ? colors.darkMode.topDark : colors.darkMode.light,
    },
    coverImg: {
        marginLeft: 4,
        marginRight: 4,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    ratingCon: {
        flexDirection: 'row',
    },
    rating: {
        fontSize: spacing.md,
    },
    cardMain: {
        width: '100%',
        justifyContent: 'center',
        paddingRight: spacing.md,
        paddingLeft: spacing.md,
        backgroundColor: isDark ? colors.darkMode.topDark : colors.darkMode.light,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: isDark ? colors.darkMode.topDark : 'white'
    },
    contentCon: {
        padding: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isDark ? colors.darkMode.topDark : colors.darkMode.light,
        borderBottomLeftRadius: isDetails ? 0 : 10,
        borderBottomRightRadius: isDetails ? 0 : 10
    },
    address: {
        fontFamily: fonts.body,
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
