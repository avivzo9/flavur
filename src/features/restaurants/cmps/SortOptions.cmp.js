import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip, IconButton } from "react-native-paper";
import { AppConfigContext } from "../../../services/appConfig/appConfig.context";
import { spacing } from "../../../utils/sizes";

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
                <Chip mode={sortBy === 'priceLevel' ? 'flat' : 'outlined'} style={styles(isDarkMode).chip} icon="currency-usd" onPress={() => sendFilter('priceLevel')}>Price</Chip>
                <Chip mode={sortBy === 'rating' ? 'flat' : 'outlined'} style={styles(isDarkMode).chip} icon="star" onPress={() => sendFilter('rating')}>Rating</Chip>
                <Chip mode={sortBy === 'distance' ? 'flat' : 'outlined'} style={styles(isDarkMode).chip} icon="map-marker-distance" onPress={() => sendFilter('distance')}>Distance</Chip>
                <Chip mode={isOpenNow ? 'flat' : 'outlined'} style={styles(isDarkMode).chip} icon="timetable" onPress={() => sendFilter(!isOpenNow, true)}>Open now</Chip>
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

const styles = (isDark) => StyleSheet.create({
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
    chip: {
        marginRight: spacing.sm,
        height: 34,
    }
})
