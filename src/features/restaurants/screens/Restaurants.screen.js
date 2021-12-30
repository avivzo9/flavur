import React, { useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { fontSizes, spacing } from '../../../utils/sizes';
import RestaurantsCard from '../cmps/RestaurantsCard.cmp';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Search from '../cmps/Search.cmp';
import FadeInView from '../../animations/fade.animation';
import { LocationContext } from '../../../services/location/location.context';

export default function RestaurantsScreen({ navigation }) {
    const { restaurants, restaurantLoading, restaurantError } = useContext(RestaurantsContext)
    const { locationError, isLocationLoading } = useContext(LocationContext)

    const isErrors = (!!restaurantError || !!locationError);

    if (restaurantLoading || isLocationLoading) return (<ActivityIndicator style={{ flex: 1 }} animating={true} size="large" color={Colors.red800} />)

    return (
        <SafeAreaView style={styles.container}>
            <Search />
            {isErrors && <View style={styles.errCon}>
                <Text style={styles.errorMsg}>Something went wrong retrieving the data.</Text>
                <Text style={styles.errorMsg}>Try again later.</Text>
            </View>}
            {!isErrors && <FlatList data={restaurants}
                renderItem={({ item, idx }) => <FadeInView duration={500}>
                    <RestaurantsCard navigation={navigation} restaurant={item} key={`${item.place_id}-${idx}`} />
                </FadeInView>}
                contentContainerStyle={{ padding: spacing.md }} />}
        </SafeAreaView >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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