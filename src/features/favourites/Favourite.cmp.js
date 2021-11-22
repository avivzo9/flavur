import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FavouritesContext } from '../../services/favourites/favourites.context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontSizes } from '../../utils/sizes';

export default function Favourite() {
    const { favourites, addFavourites, removeFavourites } = useContext(FavouritesContext)

    return (
        <TouchableOpacity style={styles.favBtn}>
            <Ionicons name="heart" size={24} color={'red'} />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    favBtn: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 9,
        fontSize: fontSizes.md,
    }
});