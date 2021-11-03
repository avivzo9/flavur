import React, { useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { spacing } from '../../../utils/sizes';
import RestaurantsCard from '../cmps/RestaurantsCard.cmp';
import { ActivityIndicator, Colors } from 'react-native-paper';
import LocationSearch from '../cmps/LocationSearch';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RestaurantsScreen({ navigation }) {
    const { restaurants, isLoading } = useContext(RestaurantsContext)

    if (isLoading) return (<ActivityIndicator style={{ flex: 1 }} animating={true} size="large" color={Colors.red800} />)

    return (
        <SafeAreaView style={styles.container}>
            <LocationSearch />
            <FlatList data={restaurants}
                renderItem={({ item, idx }) => <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails')}><RestaurantsCard restaurant={item} key={`${item.index}-${idx}`} /></TouchableOpacity>}
                contentContainerStyle={{ padding: spacing.md }} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});