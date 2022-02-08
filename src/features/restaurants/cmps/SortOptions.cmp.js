import React from "react";
import { View } from "react-native";
import { Chip, IconButton } from "react-native-paper";
import { spacing } from "../../../utils/sizes";

export default function SortOptions({ sortBy, setSortBy, isDescending, setIsDescending, setIsListLoading }) {

    const sendSort = (sort) => {
        setIsListLoading(true)
        setSortBy(sort)
    }

    const sendDescending = () => {
        setIsListLoading(true)
        setIsDescending(!isDescending)
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '90%' }}>
                <Chip mode={sortBy === 'priceLevel' ? 'flat' : 'outlined'} style={{ marginRight: spacing.sm, height: 34 }} icon="currency-usd" onPress={() => sortBy === 'priceLevel' ? sendSort(null) : sendSort('priceLevel')}>Price Level</Chip>
                <Chip mode={sortBy === 'rating' ? 'flat' : 'outlined'} style={{ marginRight: spacing.sm, height: 34 }} icon="star" onPress={() => sortBy === 'rating' ? sendSort(null) : sendSort('rating')}>Rating</Chip>
                <Chip mode={sortBy === 'open-now' ? 'flat' : 'outlined'} style={{ marginRight: spacing.sm, height: 34 }} icon="timetable" onPress={() => sortBy === 'open-now' ? sendSort(null) : sendSort('open-now')}>Open now</Chip>
            </View>
            <IconButton
                style={{ width: '10%' }}
                icon={isDescending ? "arrow-down-bold-circle" : "arrow-up-bold-circle"}
                color={'white'}
                size={32}
                onPress={() => sendDescending()}
            />
        </View>
    )
}
