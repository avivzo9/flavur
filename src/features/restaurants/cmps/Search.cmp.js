import { Slider } from '@miblanchard/react-native-slider';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RNSettings from 'react-native-settings';
import { isLocationOn } from '../../../services/app.config';
import { LocationContext } from '../../../services/location/location.context';
import { spacing } from '../../../utils/sizes';

export default function Search({ routeName }) {
    const { keyword, onSearch, initLocation } = useContext(LocationContext)
    const [searchKeyword, setSearchKeyword] = useState(keyword)
    const [isLocation, setIsLocation] = useState(null)
    const [radius, setRadius] = useState(0)

    const search = async (txt) => await onSearch(txt)

    useEffect(() => {
        isLocationOn().then(res => setIsLocation(res))
        setSearchKeyword(keyword)
    }, [keyword])

    return (
        <View style={routeName === 'map' ? styles.searchMapCon : styles.searchCon}>
            <Searchbar placeholder="Search..." value={searchKeyword}
                icon={isLocation == RNSettings.ENABLED ? 'map-marker-outline' : 'map-marker-off'}
                onIconPress={initLocation}
                onSubmitEditing={() => search(searchKeyword)}
                onChangeText={(txt) => setSearchKeyword(txt)}
            />
            <Slider
                value={radius}
                onValueChange={value => setRadius(value)}
                animateTransitions={true}
                trackStyle={{ backgroundColor: 'grey' }}
                thumbStyle={{ backgroundColor: 'tomato' }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    searchCon: {
        padding: spacing.md,
    },
    searchMapCon: {
        padding: spacing.md,
        position: 'absolute',
        zIndex: 999,
        width: '100%'
    },
});
