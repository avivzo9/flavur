import React, { useContext, useEffect, useState } from "react"
import { Button, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Divider, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { fontSizes, spacing } from "../../../utils/sizes";
import RestaurantCard from "../cmps/RestaurantCard.cmp";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RestaurantReview from "../cmps/RestaurantsReview";
import { AppConfigContext } from "../../../services/appConfig/appConfig.context";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";
import RestaurantDetailsNav from "../cmps/RestaurantDetailsNav";

export default function RestaurantsDetails({ navigation, route }) {
    const { isDarkMode } = useContext(AppConfigContext)
    const { restaurant } = route.params

    const [priceLevelStr, setPriceLevelStr] = useState(null)
    const [weekday, setWeekday] = useState(null)

    useEffect(() => {
        formatPriceLevel()
        formatOpeningHours()
    }, [restaurant])

    const formatOpeningHours = () => {
        if (!restaurant.opening_hours || !restaurant.opening_hours.weekday_text || !restaurant.opening_hours.weekday_text.length) return
        const weekday = restaurant.opening_hours.weekday_text
        weekday.unshift(weekday[weekday.length - 1])
        weekday.pop()
        setWeekday(weekday)
    }

    const formatPriceLevel = () => {
        if (!restaurant.price_level) return
        let str = ''
        const priceLevelArr = Array.from(new Array(Math.floor(restaurant.price_level)))
        priceLevelArr.map((_) => str += '$')
        if (str) setPriceLevelStr(str)
    }

    if (!restaurant) return (<View style={styles(isDarkMode).detailsError}>
        <Text style={[styles().errorTxt, styles(isDarkMode).darkModeTxt]}>There was a problem getting this restaurant information, Try again later.</Text>
        <Button title="Go Back" style={styles(isDarkMode).button} color={colors.darkMode.topDark} icon="step-backward" mode="contained" onPress={() => navigation.goBack()} />
    </View>)

    const isInformation = ((restaurant.price_level && priceLevelStr) || (restaurant.opening_hours && weekday && weekday.length))

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <RestaurantCard route={route.name} isDetails={true} restaurant={restaurant} />
            <Divider />
            <ScrollView style={styles(isDarkMode).detailsCon}>
                {/* {(restaurant.opening_hours || restaurant.price_level) && <> */}
                <View style={styles().headerCon}>
                    <Ionicons name='information-circle-outline' size={28} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} />
                    <Text style={[styles().header, styles(isDarkMode).darkModeTxt]}>{isInformation ? 'Information' : 'No Information'}</Text>
                </View>
                <List.Section>
                    {(restaurant.price_level && priceLevelStr) && <List.Item
                        title={`Price Level - ${priceLevelStr}`}
                        style={styles(isDarkMode).accordion}
                        titleStyle={styles(isDarkMode).darkModeTxt}
                        left={props => <List.Icon {...props} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} icon="currency-usd" />}
                    />}
                    {(restaurant.opening_hours && weekday && weekday.length) && <List.Accordion
                        title="Opening hours"
                        style={styles(isDarkMode).accordion}
                        titleStyle={styles(isDarkMode).darkModeTxt}
                        left={props => <List.Icon {...props} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} icon="food" />}>
                        {weekday.map((day, idx) => <List.Item titleStyle={styles(isDarkMode).darkModeTxt} style={{ backgroundColor: isDarkMode ? colors.darkMode.topDark : 'rgba(128, 128, 128, 0.01)' }} title={day} key={day + (idx * 2)} />)}
                    </List.Accordion>}
                    <TouchableOpacity onPress={() => navigation.navigate('map', { restaurant: restaurant })} activeOpacity={0.8}>
                        <List.Item
                            title={'Show on map'}
                            style={styles(isDarkMode).accordion}
                            titleStyle={styles(isDarkMode).darkModeTxt}
                            left={props => <List.Icon {...props} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} icon="map" />}
                        />
                    </TouchableOpacity>
                </List.Section>
                {/* </>} */}
                {(restaurant.reviews && !!restaurant.reviews.length) && <View>
                    <View style={styles().headerCon}>
                        <Ionicons name='star-outline' size={28} color={isDarkMode ? colors.darkMode.light : colors.darkMode.dark} />
                        <Text style={[styles().header, styles(isDarkMode).darkModeTxt]}>Top Reviews</Text>
                    </View>
                    {!!restaurant.reviews.length && restaurant.reviews.map((review, idx) => <RestaurantReview isDarkMode={isDarkMode} key={review.author_name + (idx * 2)} review={review} />)}
                </View>}
            </ScrollView>
            <Divider />
            <RestaurantDetailsNav restaurant={restaurant} isDarkMode={isDarkMode} navigation={navigation} />
        </SafeAreaView >
    )
}

const styles = (isDark) => StyleSheet.create({
    detailsCon: {
        height: 100,
        backgroundColor: isDark ? colors.darkMode.dark : colors.darkMode.light
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
        backgroundColor: isDark ? colors.darkMode.topDark : 'rgba(255, 255, 255, 0.1)',
        marginBottom: 10
    },
})