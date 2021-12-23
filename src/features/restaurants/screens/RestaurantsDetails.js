import React, { useContext, useEffect, useState } from "react"
import { Image, Linking, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { spacing } from "../../../utils/sizes";
import RestaurantsCard from "../cmps/RestaurantsCard.cmp";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Colors } from 'react-native-paper';

const mapsIcon = require('../../../assets/icons/google_maps_icon.png')
const wazeIcon = require('../../../assets/icons/waze_icon.png')

export default function RestaurantsDetails({ navigation, route }) {
    const { searchRestaurantDetails } = useContext(RestaurantsContext)
    const { restaurant } = route.params

    const [details, setDetails] = useState(null)

    const getDetails = async (placeId) => setDetails(await searchRestaurantDetails(placeId))

    useEffect(() => {
        if (restaurant) getDetails(restaurant.place_id)
    }, [restaurant])

    if (!details) return (<ActivityIndicator style={{ flex: 1 }} animating={true} size="large" color={Colors.red800} />)

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <RestaurantsCard isDetails={true} restaurant={restaurant} isNavigate={route} />
            <ScrollView style={{ height: 100 }}>
                {details.opening_hours && <List.Section title="Restaurant Information">
                    <List.Accordion
                        title="Opening hours"
                        left={props => <List.Icon {...props} icon="food" />}>
                        {details.opening_hours.weekday_text.map((day, idx) => <List.Item style={{ color: 'black' }} title={day} key={idx} />)}
                    </List.Accordion>
                </List.Section>}
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
        </SafeAreaView>
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
})


// {
//     "business_status": "OPERATIONAL", "geometry": { "details.geometry.location": { "lat": 37.7841178, "lng": -122.4063857 }, "viewport": { "northeast": [Object], "southwest": [Object] } },
//     "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
//     "icon_background_color": "#4B96F3",
//     "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
//     "name": "Westfield San Francisco Centre", "opening_hours": { "open_now": false },
//     "photos": ["https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEDsIRIA6W_JutUNt787DA4VEd9QXodUQxAdgQykxMhFVdhykbELRJaurMHjURsBit8YH4oOENFvYWPhhZY0ViC6SeH6ba-eZCFc8eVZTFnBthrqWQzOwUSIEAoTktjHkixHG3vRAq-PELKgH-QaqH-ZSr42F12_zXRIOf_FZYr6Z0OD"],
//     "place_id": "ChIJ6zMe3oWAhYARaZ33Z1BAMRo",
//     "plus_code": { "compound_code": "QHMV+JC Yerba Buena, San Francisco, CA, USA", "global_code": "849VQHMV+JC" },
//     "rating": 4.3, "reference": "ChIJ6zMe3oWAhYARaZ33Z1BAMRo", "scope": "GOOGLE",
//     "types": ["shopping_mall", "department_store", "movie_theater", "shoe_store", "restaurant", "food", "point_of_interest", "clothing_store", "store", "establishment"],
//     "user_ratings_total": 17335,
//     "vicinity": "865 Market Street, San Francisco"
// }