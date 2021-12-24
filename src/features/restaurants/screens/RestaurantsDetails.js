import React, { useContext, useEffect, useState } from "react"
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Divider, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { fontSizes, spacing } from "../../../utils/sizes";
import RestaurantsCard from "../cmps/RestaurantsCard.cmp";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { isDarkMode } from "../../../services/app.config";
import RestaurantReview from "../cmps/RestaurantsReview";

const mapsIcon = require('../../../assets/icons/google_maps_icon.png')
const wazeIcon = require('../../../assets/icons/waze_icon.png')

export default function RestaurantsDetails({ navigation, route }) {
    const { searchRestaurantDetails, restaurantLoading } = useContext(RestaurantsContext)
    const { restaurant } = route.params

    const [details, setDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getDetails = async (placeId) => setDetails(await searchRestaurantDetails(placeId))

    useEffect(() => {
        if (restaurant) getDetails(restaurant.place_id).then(() => setIsLoading(false))
    }, [restaurant])

    if (isLoading || restaurantLoading) return (<ActivityIndicator style={{ flex: 1 }} animating={true} size="large" color={Colors.red800} />)
    if (!details) return (<View><Text>There was a problem getting this restaurant information</Text></View>)

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <RestaurantsCard route={route.name} isDetails={true} restaurant={restaurant} isNavigate={route} />
            <ScrollView style={{ height: 100 }}>
                {details.opening_hours && <>
                    <View style={styles.headerCon}>
                        <Ionicons name='information-circle-outline' size={28} color={isDarkMode ? 'white' : 'black'} />
                        <Text style={styles.header}>Information</Text>
                    </View>
                    <List.Section>
                        <List.Accordion
                            title="Opening hours"
                            left={props => <List.Icon {...props} icon="food" />}>
                            {details.opening_hours.weekday_text.map((day, idx) => <List.Item style={styles.item} title={day} key={day + idx} />)}
                        </List.Accordion>
                    </List.Section>
                </>}
                {!!details.reviews.length && <View>
                    <View style={styles.headerCon}>
                        <Ionicons name='star-outline' size={28} color={isDarkMode ? 'white' : 'black'} />
                        <Text style={styles.header}>Reviews</Text>
                    </View>
                    {details.reviews.map((review, idx) => <><Divider key={`divider-${review.author_name + idx}`} /><RestaurantReview key={review.author_name + idx} review={review} /></>)}
                </View>}
            </ScrollView>
            <View style={styles.navCon}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.mapsBtn} activeOpacity={0.8}>
                    <Ionicons name='arrow-back' size={28} color='black' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(details.url)} style={styles.mapsBtn} activeOpacity={0.8}>
                    <Image style={styles.navImg} source={mapsIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`https://www.waze.com/ul?ll=${details.geometry.location.lat}%2C${details.geometry.location.lng}&navigate=yes&zoom=17`)} style={styles.wazeBtn} activeOpacity={0.8}>
                    <View style={styles.wazeInnerView}>
                        <Image style={styles.navImg} source={wazeIcon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(details.website)} style={styles.mapsBtn} activeOpacity={0.8}>
                    <Ionicons name='link' size={28} color='black' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${details.formatted_phone_number}`)} style={styles.mapsBtn} activeOpacity={0.8}>
                    <Ionicons name='call' size={28} color='black' />
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    navCon: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        flexDirection: 'row'
    },
    mapsBtn: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 5,
    },
    wazeBtn: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 5,
        backgroundColor: '#fff'
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
    item: {
        color: isDarkMode ? 'white' : 'black',
    },
    headerCon: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    header: {
        color: isDarkMode ? 'white' : 'black',
        fontSize: fontSizes.md,
        padding: spacing.sm,
        fontWeight: 'bold'
    },
})