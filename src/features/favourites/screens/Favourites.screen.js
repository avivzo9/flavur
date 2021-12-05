import React, { useContext } from "react"
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { fontSizes, spacing } from "../../../utils/sizes";
import FavouritesCard from "../../settings/cmps/FavouritesCard.cmp";

export default function FavouritesScreen({ navigation }) {
    const { favourites } = useContext(FavouritesContext)

    if (!favourites && !favourites.length) return (
        <SafeAreaView style={styles.noFavourites}>
            <Text style={styles.noFavouritesTitle}>No favourites found yet</Text>
        </SafeAreaView>)

    return (
        <SafeAreaView>
            <Text style={styles.title}>Your Favourites</Text>
            <FlatList data={favourites}
                renderItem={({ item, idx }) => <FavouritesCard navigation={navigation} favourite={item} key={`${item.index}-${idx}`} />}
                contentContainerStyle={{ padding: spacing.md }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    noFavourites: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noFavouritesTitle: {
        color: 'black',
        fontSize: fontSizes.md
    },
    title: {
        color: 'black',
        fontSize: fontSizes.lg,
        textAlign: 'center',
        padding: spacing.md,
        fontFamily: 'Oswald-VariableFont_wght',
    }
});