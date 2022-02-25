import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Chip, IconButton } from "react-native-paper";
import { AppConfigContext } from "../../../services/appConfig/appConfig.context";
import { spacing } from "../../../utils/sizes";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../../../utils/colors";

export default function SortOptions({ sortBy, setSortBy, isDescending, setIsDescending, setIsListLoading, setIsOpenNow, isOpenNow }) {
    const { isDarkMode } = useContext(AppConfigContext)

    const sendFilter = (filter, isOpen) => {
        setIsListLoading(true)
        if (sortBy === filter) setSortBy(null)
        else if (isOpen) setIsOpenNow(filter)
        else setSortBy(filter)
    }

    const sendDescending = () => {
        setIsListLoading(true)
        setIsDescending(!isDescending)
    }

    return (
        <View style={styles().container}>
            <ScrollView style={styles().filters} horizontal={true} showsHorizontalScrollIndicator={false} >
                <TouchableOpacity activeOpacity={0.8} onPress={() => sendFilter('priceLevel')} style={styles(isDarkMode, sortBy, 'priceLevel').chipCon}>
                    <Ionicons style={[styles(isDarkMode, sortBy, 'priceLevel').chip, { paddingRight: spacing.sm }]} name={sortBy === 'priceLevel' ? 'pricetag' : 'pricetag-outline'} />
                    <Text style={styles(isDarkMode, sortBy, 'priceLevel').chip}>Price</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => sendFilter('rating')} style={styles(isDarkMode, sortBy, 'rating').chipCon}>
                    <Ionicons style={[styles(isDarkMode, sortBy, 'rating').chip, { paddingRight: spacing.sm }]} name={sortBy === 'rating' ? 'star' : 'star-outline'} />
                    <Text style={styles(isDarkMode, sortBy, 'rating').chip}>Rating</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => sendFilter('distance')} style={styles(isDarkMode, sortBy, 'distance').chipCon}>
                    <Ionicons style={[styles(isDarkMode, sortBy, 'distance').chip, { paddingRight: spacing.sm }]} name={sortBy === 'distance' ? 'navigate-circle' : 'navigate-circle-outline'} />
                    <Text style={styles(isDarkMode, sortBy, 'distance').chip}>Distance</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => sendFilter(!isOpenNow, true)} style={styles(isDarkMode, sortBy, isOpenNow).openChipCon}>
                    <Ionicons style={[styles(isDarkMode, sortBy, isOpenNow).openChip, { paddingRight: spacing.sm }]} name={isOpenNow ? 'time' : 'time-outline'} />
                    <Text style={styles(isDarkMode, sortBy, isOpenNow).openChip}>Open</Text>
                </TouchableOpacity>
            </ScrollView>
            <IconButton
                icon={isDescending ? "arrow-down-bold-circle" : "arrow-up-bold-circle"}
                color={isDarkMode ? 'white' : 'black'}
                size={34}
                onPress={() => sendDescending()}
                style={{ margin: 0 }}
            />
        </View>
    )
}

const styles = (isDark, sortBy, value) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 50,
    },
    filters: {
        flexDirection: 'row',
    },
    chipCon: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderWidth: isDark ? 1 : 0.5,
        borderRadius: 50,
        height: 35,
        paddingRight: 10,
        paddingLeft: 10,
        marginRight: spacing.sm,
        backgroundColor: sortBy === value ? isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' : isDark ? colors.darkMode.topDark : colors.darkMode.light,
        borderColor: sortBy === value ? isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
    },
    chip: {
        color: sortBy === value ? isDark ? colors.darkMode.light : colors.darkMode.dark : isDark ? colors.darkMode.topLight : 'rgba(0, 0, 0, 0.7)',
        fontSize: 14
    },
    openChipCon: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderWidth: isDark ? 1 : 0.5,
        borderRadius: 50,
        height: 35,
        paddingRight: 10,
        paddingLeft: 10,
        marginRight: spacing.sm,
        backgroundColor: value ? isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' : isDark ? colors.darkMode.topDark : colors.darkMode.light,
        borderColor: value ? isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'

    },
    openChip: {
        color: value ? isDark ? colors.darkMode.light : colors.darkMode.dark : isDark ? colors.darkMode.topLight : 'rgba(0, 0, 0, 0.7)',
        fontSize: 14
    },
})
