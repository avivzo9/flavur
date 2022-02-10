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

// TODO: filterBy: {price, rating, open-now}

export default function RestaurantsScreen({ navigation }) {
    const { restaurants, restaurantLoading, restaurantError } = useContext(RestaurantsContext)
    const { locationError, isLocationLoading } = useContext(LocationContext)
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
        if (sortBy) sortRestaurants()
        else {
            const data = JSON.parse(JSON.stringify(restaurants))
            setRestsData(data)
            setRestsData(prevData => prevData = isOpenNow ? data.filter((r) => (r.opening_hours && r.opening_hours.open_now)) : [...data])
            setIsListLoading(false)
        }
    }, [sortBy, isDescending, isOpenNow])

    const sortRestaurants = () => {
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
        }
        setRestsData(prevData => prevData = isOpenNow ? restsData.filter((r) => (r.opening_hours && r.opening_hours.open_now)) : [...restsData])
        setIsListLoading(false)
    }

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