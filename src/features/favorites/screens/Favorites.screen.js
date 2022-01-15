import React, { useContext } from "react"
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppConfigContext } from "../../../services/appConfig/appConfig.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";
import { fontSizes, spacing } from "../../../utils/sizes";
import FadeInView from "../../animations/fade.animation";
import SmallRestCard from "../cmps/SmallRestCard";

export default function FavoritesScreen({ navigation }) {
    const { favorites } = useContext(FavoritesContext)
    const { isDarkMode } = useContext(AppConfigContext)

    if (!favorites.length) return (
        <SafeAreaView style={styles(isDarkMode).container}>
            <Text style={[styles().noFavoritesTitle, styles(isDarkMode).darkModeTxt]}>No favorites found yet</Text>
        </SafeAreaView>)

    return (
        <SafeAreaView style={styles(isDarkMode).container}>
            <Text style={[styles().title, styles(isDarkMode).darkModeTxt]}>Your Favorites</Text>
            <FlatList data={favorites}
                renderItem={({ item, idx }) => <FadeInView key={`${item.place_id}-${idx}`}><SmallRestCard isDarkMode={isDarkMode} navigation={navigation} restaurant={item} /></FadeInView>}
                contentContainerStyle={{ padding: spacing.md }} />
        </SafeAreaView>
    )
}

const styles = (isDark) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDark ? colors.darkMode.dark : colors.darkMode.light
    },
    noFavoritesTitle: {
        fontSize: fontSizes.lg - 4,
        fontFamily: fonts.header
    },
    title: {
        fontSize: fontSizes.lg,
        textAlign: 'center',
        padding: spacing.md,
        fontFamily: fonts.header,
    },
    darkModeTxt: {
        color: isDark ? colors.darkMode.light : colors.darkMode.dark,
        opacity: isDark ? 0.9 : 1
    },
});