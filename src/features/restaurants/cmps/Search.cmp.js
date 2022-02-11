import React, { useContext, useEffect, useState } from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { AppConfigContext } from '../../../services/appConfig/appConfig.context';
import { LocationContext } from '../../../services/location/location.context';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { spacing } from '../../../utils/sizes';
import { colors } from '../../../utils/colors';
import SortOptions from './SortOptions.cmp';

export default function Search({ routeName, sortBy, setSortBy, isDescending, setIsDescending, setIsListLoading, setIsOpenNow, isOpenNow }) {
    const { setSearchRadius, isLocation, searchRadius, isDarkMode } = useContext(AppConfigContext)
    const { keyword, onSearch, initLocation, setIsLocationLoading } = useContext(LocationContext)
    const { initContext } = useContext(RestaurantsContext)

    const [searchKeyword, setSearchKeyword] = useState(keyword)
    const [radiusVal, setRadiusVal] = useState(searchRadius)

    useEffect(() => {
        setSearchKeyword(keyword)
    }, [keyword])

    const search = (txt) => onSearch(txt)

    const onChangeRadius = () => {
        setSearchRadius(radiusVal)
        initContext()
    }

    const onInitLocation = () => {
        console.log('pressed!');
        setIsLocationLoading(true)
        initLocation(true)
    }

    return (
        <View style={routeName === 'map' ? styles().searchMapCon : styles().searchCon}>
            <Searchbar placeholder="Search..." value={searchKeyword}
                icon={isLocation ? 'map-marker-outline' : 'map-marker-off'}
                iconColor={isDarkMode ? colors.darkMode.light : colors.darkMode.dark}
                inputStyle={{ color: isDarkMode ? colors.darkMode.light : colors.darkMode.dark }}
                style={styles(isDarkMode).input}
                onIconPress={() => onInitLocation()}
                onSubmitEditing={() => search(searchKeyword)}
                onChangeText={(txt) => setSearchKeyword(txt)}
            />
            <View style={styles().filters}>
                <Slider
                    value={searchRadius}
                    onValueChange={value => setRadiusVal(value)}
                    onSlidingComplete={onChangeRadius}
                    animateTransitions={true}
                    thumbStyle={{ backgroundColor: 'tomato' }}
                    minimumTrackTintColor={isDarkMode ? colors.darkMode.light : '#3f3f3f'}
                    maximumTrackTintColor={isDarkMode ? '#3f3f3f' : '#b3b3b3'}
                    minimumValue={0.1}
                    maximumValue={0.9}
                    step={0.4}
                    width={'100%'}
                    trackStyle={{ padding: 3 }}
                    trackClickable={false}
                />
                {routeName != 'map' && <SortOptions
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    isDescending={isDescending}
                    setIsDescending={setIsDescending}
                    setIsListLoading={setIsListLoading}
                    setIsOpenNow={setIsOpenNow}
                    isOpenNow={isOpenNow}
                />}
            </View>
        </View>
    )
};

const styles = (isDark) => StyleSheet.create({
    searchCon: {
        padding: spacing.md,
        paddingBottom: 0,
    },
    searchMapCon: {
        padding: spacing.md,
        position: 'absolute',
        zIndex: 999,
        width: '100%',
    },
    filters: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 0,
    },
    input: {
        backgroundColor: isDark ? colors.darkMode.topDark : colors.darkMode.light,
        color: 'white'
    },
});
