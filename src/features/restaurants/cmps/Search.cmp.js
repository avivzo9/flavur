import { Slider } from '@miblanchard/react-native-slider';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RNSettings from 'react-native-settings';
import { changeSearchRadius, isLocationOn, radius } from '../../../services/app.config';
import { LocationContext } from '../../../services/location/location.context';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { spacing } from '../../../utils/sizes';

export default function Search({ routeName }) {
    const { keyword, onSearch, initLocation } = useContext(LocationContext)
    const { initContext } = useContext(RestaurantsContext)
    const [searchKeyword, setSearchKeyword] = useState(keyword)
    const [isLocation, setIsLocation] = useState(null)
    const [radiusVal, setRadiusVal] = useState(radius)

    useEffect(() => {
        isLocationOn().then(res => setIsLocation(res))
        setSearchKeyword(keyword)
    }, [keyword])

    const search = async (txt) => await onSearch(txt)

    const onChangeRadius = () => {
        changeSearchRadius(radiusVal)
        initContext()
    }

    return (
        <View style={routeName === 'map' ? styles.searchMapCon : styles.searchCon}>
            <Searchbar placeholder="Search..." value={searchKeyword}
                icon={isLocation == RNSettings.ENABLED ? 'map-marker-outline' : 'map-marker-off'}
                onIconPress={() => initLocation(true)}
                onSubmitEditing={() => search(searchKeyword)}
                onChangeText={(txt) => setSearchKeyword(txt)}
            />
            <View style={styles.radiusCon}>
                <Slider
                    value={radius}
                    onValueChange={value => setRadiusVal(value)}
                    onSlidingComplete={onChangeRadius}
                    animateTransitions={true}
                    thumbStyle={{ backgroundColor: 'tomato' }}
                    minimumValue={0.1}
                    maximumValue={0.9}
                    step={0.2}
                    style={styles.radius}
                    width={'109%'}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    searchCon: {
        padding: spacing.md,
        paddingBottom: 0
    },
    searchMapCon: {
        padding: spacing.md,
        position: 'absolute',
        zIndex: 999,
        width: '100%'
    },
    radiusCon: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.md,
        paddingBottom: 0
    }
});
