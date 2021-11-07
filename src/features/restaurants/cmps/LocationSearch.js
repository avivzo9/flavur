import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { LocationContext } from '../../../services/location/location.context';
import { spacing } from '../../../utils/sizes';

export default function LocationSearch({ routeName }) {
    const { keyword, onSearch } = useContext(LocationContext)
    const [searchKeyword, setSearchKeyword] = useState(keyword)

    const search = async (txt) => await onSearch(txt)

    useEffect(() => {
        setSearchKeyword(keyword)
    }, [keyword])

    return (
        <View style={routeName === 'map' ? styles.searchMapCon : styles.searchCon}>
            <Searchbar placeholder="Search..." value={searchKeyword}
                onSubmitEditing={() => search(searchKeyword)}
                onChangeText={(txt) => setSearchKeyword(txt)}
                icon={routeName === 'map' ? 'map' : null} />
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
    }
});
