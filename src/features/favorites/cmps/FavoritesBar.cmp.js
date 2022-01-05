import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fontSizes, spacing } from '../../../utils/sizes';
import CompactRestCard from '../../map/cmps/CompactRestCard.cmp';

export default function FavoritesBar({ favorites, navigation }) {

    return (
        <>
            <Text style={styles.header}>Favorite Restaurants</Text>
            {!favorites.length && <View style={styles.container}>
                <Text style={styles.noFavorites}>There are no favorite restaurants</Text>
            </View>}
            {!!favorites.length && <View style={styles.container}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    {favorites.map((res) => <View key={res.place_id}>
                        <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails', { restaurant: res })} activeOpacity={0.8}>
                            <CompactRestCard restaurant={res} />
                        </TouchableOpacity>
                    </View>)}
                </ScrollView>
            </View>}
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: spacing.md,
        paddingRight: spacing.md,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
    },
    noFavorites: {
        color: 'black',
        fontSize: fontSizes.md
    },
    header: {
        color: 'black',
        paddingLeft: spacing.md,
        paddingRight: spacing.md,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
        fontSize: fontSizes.md
    },
});
