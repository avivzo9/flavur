import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { spacing } from '../../../utils/sizes';
import RestaurantsCard from '../cmps/RestaurantsCard.cmp';

export default function RestaurantsScreen() {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchCon}>
                <Searchbar
                    placeholder="Search"
                />
            </View>
            <FlatList data={[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }]} renderItem={() => <RestaurantsCard />} keyExtractor={item => item.name} contentContainerStyle={{ padding: spacing.md }} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchCon: {
        padding: spacing.md,
    },
});