import React, { useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { fontSizes, spacing } from '../../../utils/sizes';
import RestaurantCard from '../cmps/RestaurantCard.cmp';
import Search from '../cmps/Search.cmp';
import FadeInView from '../../animations/fade.animation';
import { LocationContext } from '../../../services/location/location.context';
import { colors } from '../../../utils/colors';
import { AppConfigContext } from '../../../services/appConfig/appConfig.context';
import Loader from '../../Loader';

export default function RestaurantsScreen({ navigation }) {
    const { restaurants, restaurantLoading, restaurantError } = useContext(RestaurantsContext)
    const { currLocation, locationError, isLocationLoading, initLocation } = useContext(LocationContext)
    const { isDarkMode } = useContext(AppConfigContext)

    const isErrors = (!!restaurantError || !!locationError);

    const [restsData, setRestsData] = useState(null)
    const [isListLoading, setIsListLoading] = useState(false)
    const [isDescending, setIsDescending] = useState(true)
    const [sortBy, setSortBy] = useState(null)
    const [isOpenNow, setIsOpenNow] = useState(false)

    useEffect(() => {
        const data = JSON.parse(JSON.stringify(restaurants))
        setRestsData(data)
    }, [restaurants])

    useEffect(() => {
        sortRestaurants()
        // const data = JSON.parse(JSON.stringify(restaurants))
        // setRestsData(prevData => prevData = isOpenNow ? data.filter((r) => (r.opening_hours && r.opening_hours.open_now)) : [...data])
        // setIsListLoading(false)
    }, [sortBy, isDescending, isOpenNow])

    const sortRestaurants = () => {
        if (!sortBy) {
            if (isOpenNow) setRestsData(prevData => prevData = isOpenNow ? restsData.filter((r) => (r.opening_hours && r.opening_hours.open_now)) : [...restsData])
            console.log('isOpenNow:', isOpenNow)
            setIsListLoading(false)
            return
        }
        switch (sortBy) {
            case 'priceLevel':
                restsData.sort((a, b) => a.price_level - b.price_level);
                if (isDescending) restsData.reverse()
                restsData.forEach((rest, idx) => {
                    if (!rest.price_level) {
                        restsData.splice(idx, 1)
                        restsData.push(rest)
                    }
                })
                break;
            case 'rating':
                restsData.sort((a, b) => a.rating - b.rating);
                if (isDescending) restsData.reverse()
                restsData.forEach((rest, idx) => {
                    if (!rest.rating) {
                        restsData.splice(idx, 1)
                        restsData.push(rest)
                    }
                })
                break;
            case 'distance':
                if (currLocation) {
                    restsData.forEach((rest) => {
                        const distance = getDistanceFromLatLonInKm(parseInt(currLocation.lat),
                            parseInt(currLocation.lng), rest.geometry.location.lat,
                            rest.geometry.location.lng);
                        rest.distance = distance;
                    })
                    restsData.sort((a, b) => a.distance - b.distance);
                    if (isDescending) restsData.reverse()
                } else {
                    initLocation(true)
                    setSortBy(null)
                }
                break;
            default:
                break;
        }
        setRestsData(prevData => prevData = isOpenNow ? restsData.filter((r) => (r.opening_hours && r.opening_hours.open_now)) : [...restsData])
        setIsListLoading(false)
    }

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        var R = 6371;
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    const deg2rad = (deg) => deg * (Math.PI / 180)

    if (restaurantLoading || isLocationLoading || !restsData || !restsData.length) return (<Loader />)

    return (
        <SafeAreaView style={styles(isDarkMode).container}>
            <Search sortBy={sortBy} setSortBy={setSortBy} setIsOpenNow={setIsOpenNow} isOpenNow={isOpenNow} setIsListLoading={setIsListLoading} isDescending={isDescending} setIsDescending={setIsDescending} />
            {isErrors && <View style={styles().errCon}>
                <Text style={styles().errorMsg}>Something went wrong retrieving the data.</Text>
                <Text style={styles().errorMsg}>Try different search or try again later.</Text>
            </View>}
            {(!isErrors && !isListLoading) && <FlatList refreshing={true} data={restsData}
                renderItem={({ item, idx }) => <FadeInView duration={500}>
                    <RestaurantCard navigation={navigation} restaurant={item} key={`${item.name}-${idx}`} />
                </FadeInView>}
                contentContainerStyle={{ padding: spacing.md }} />}
            {isListLoading && <Loader />}
        </SafeAreaView>
    )
};

const styles = (isDark) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDark ? colors.darkMode.dark : colors.darkMode.light,
    },
    errCon: {
        marginTop: spacing.lg
    },
    errorMsg: {
        color: 'red',
        textAlign: 'center',
        fontSize: fontSizes.md,
        padding: spacing.sm
    }
});