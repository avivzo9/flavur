import React, { useContext, useEffect, useState } from "react"
import { Button, Image, Linking, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Divider, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { fontSizes, spacing } from "../../../utils/sizes";
import RestaurantsCard from "../cmps/RestaurantsCard.cmp";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RestaurantReview from "../cmps/RestaurantsReview";
import { AppConfigContext } from "../../../services/appConfig/appConfig.context";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";
import Loader from "../../Loader";

const mapsIcon = require('../../../assets/icons/google_maps_icon.png')
const wazeIcon = require('../../../assets/icons/waze_icon.png')

export default function RestaurantsDetails({ navigation, route }) {
    const { isDarkMode } = useContext(AppConfigContext)
    const { searchRestaurantDetails, restaurantLoading } = useContext(RestaurantsContext)
    const { restaurant } = route.params

    const [details, setDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getDetails = async (placeId) => setDetails(await searchRestaurantDetails(placeId))

    useEffect(() => {
        if (restaurant) getDetails(restaurant.place_id).then(() => setIsLoading(false))
    }, [restaurant])

    if (isLoading || restaurantLoading) return (<Loader />)
    if (!details) return (<View style={styles(isDarkMode).detailsError}>
        <Text style={[styles().errorTxt, styles(isDarkMode).darkModeTxt]}>There was a problem getting this restaurant information, Try again later.</Text>
        <Button title="Go Back" style={styles(isDarkMode).button} color={colors.darkMode.topDark} icon="step-backward" mode="contained" onPress={() => navigation.goBack()} />
    </View>)

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <RestaurantsCard route={route.name} isDetails={true} restaurant={restaurant} isNavigate={route} />
            <ScrollView style={styles(isDarkMode).detailsCon}>
                {details.opening_hours && <>
                    <View style={styles().headerCon}>
                        <Ionicons name='information-circle-outline' size={28} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} />
                        <Text style={[styles().header, styles(isDarkMode).darkModeTxt]}>Information</Text>
                    </View>
                    <List.Section>
                        <List.Accordion
                            title="Opening hours"
                            style={styles(isDarkMode).accordion}
                            titleStyle={styles(isDarkMode).darkModeTxt}
                            left={props => <List.Icon {...props} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} icon="food" />}>
                            {details.opening_hours.weekday_text.map((day, idx) => <List.Item titleStyle={styles(isDarkMode).darkModeTxt} title={day} key={day + (idx * 2)} />)}
                        </List.Accordion>
                    </List.Section>
                </>}
                {!!details.reviews.length && <View>
                    <View style={styles().headerCon}>
                        <Ionicons name='star-outline' size={28} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} />
                        <Text style={[styles().header, styles(isDarkMode).darkModeTxt]}>Top Reviews</Text>
                    </View>
                    {details.reviews.map((review, idx) => <><Divider key={`divider-${review.author_name + (idx * 2)}`} /><RestaurantReview isDarkMode={isDarkMode} key={review.author_name + (idx * 2)} review={review} /></>)}
                </View>}
            </ScrollView>
            <View style={styles(isDarkMode).navCon}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles(isDarkMode).iconBtn} activeOpacity={0.8}>
                    <Ionicons name='arrow-back' size={28} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(details.url)} style={styles(isDarkMode).mapsBtn} activeOpacity={0.8}>
                    <Image style={styles(isDarkMode).navImg} source={mapsIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`https://www.waze.com/ul?ll=${details.geometry.location.lat}%2C${details.geometry.location.lng}&navigate=yes&zoom=17`)} style={styles(isDarkMode).wazeBtn} activeOpacity={0.8}>
                    <View style={styles(isDarkMode).wazeInnerView}>
                        <Image style={styles().navImg} source={wazeIcon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(details.website)} style={styles(isDarkMode).iconBtn} activeOpacity={0.8}>
                    <Ionicons name='link' size={28} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${details.formatted_phone_number}`)} style={styles(isDarkMode).iconBtn} activeOpacity={0.8}>
                    <Ionicons name='call' size={28} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} />
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

const styles = (isDark) => StyleSheet.create({
    navCon: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        flexDirection: 'row',
        backgroundColor: isDark ? colors.darkMode.dark : colors.darkMode.light
    },
    detailsCon: {
        height: 100,
        backgroundColor: isDark ? colors.darkMode.dark : colors.darkMode.light
    },
    iconBtn: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: isDark ? colors.darkMode.topDark : colors.darkMode.light,
        opacity: isDark ? 0.9 : 1
    },
    mapsBtn: {
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 5,
    },
    wazeBtn: {
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 5,
    },
    wazeInnerView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 13,
        backgroundColor: '#33CCFF'
    },
    navImg: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    headerCon: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    header: {
        fontSize: fontSizes.md,
        padding: spacing.sm,
        fontWeight: 'bold'
    },
    darkModeTxt: {
        color: isDark ? colors.darkMode.light : colors.darkMode.dark,
        opacity: isDark ? 0.9 : 1
    },
    detailsError: {
        backgroundColor: isDark ? colors.darkMode.dark : colors.darkMode.light,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorTxt: {
        fontFamily: fonts.header,
        fontSize: fontSizes.md + 4,
        textAlign: 'center',
        marginBottom: spacing.md
    },
    button: {
        padding: spacing.md,
        width: 140,
        height: 50,
        margin: spacing.sm,
        alignSelf: 'center',
    },
    accordion: {
        backgroundColor: isDark ? colors.darkMode.topDark : colors.darkMode.light,
    },
})