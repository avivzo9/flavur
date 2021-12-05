import React, { useContext, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { spacing } from '../../../utils/sizes';
import RestaurantsCard from '../cmps/RestaurantsCard.cmp';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Search from '../cmps/Search.cmp';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import FavouritesBar from '../../favourites/cmps/FavouritesBar.cmp';
import FadeInView from '../../animations/fade.animation';

export default function RestaurantsScreen({ navigation }) {
    const { restaurants, isLoading } = useContext(RestaurantsContext)
    const { favourites } = useContext(FavouritesContext)

    const [isToggled, setIsToggled] = useState(false)

    if (isLoading) return (<ActivityIndicator style={{ flex: 1 }} animating={true} size="large" color={Colors.red800} />)

    return (
        <SafeAreaView style={styles.container}>
            <Search isFavouriteToggle={isToggled} onToggle={() => setIsToggled(!isToggled)} />
            {isToggled && <FavouritesBar navigation={navigation} favourites={favourites} />}

            <FlatList data={restaurants}
                renderItem={({ item, idx }) => <FadeInView>
                    <RestaurantsCard navigation={navigation} restaurant={item} key={`${item.index}-${idx}`} />
                </FadeInView>}
                contentContainerStyle={{ padding: spacing.md }} />

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});