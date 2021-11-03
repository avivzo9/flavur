import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { LocationContext } from '../../../services/location/location.context';
import { spacing } from '../../../utils/sizes';

export default function LocationSearch() {
    const { keyword, onSearch } = useContext(LocationContext)
    const [searchKeyword, setSearchKeyword] = useState(keyword)

    const search = async (txt) => await onSearch(txt)

    return (
        <View style={styles.searchCon}>
            <Searchbar placeholder="Search..." value={searchKeyword}
                onSubmitEditing={() => search(searchKeyword)}
                onChangeText={(txt) => setSearchKeyword(txt)} />
        </View>
    )
};

const styles = StyleSheet.create({
    searchCon: {
        padding: spacing.md,
    },
});
