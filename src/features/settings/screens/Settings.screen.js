import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useContext, useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { isDarkMode } from "../../../services/app.config";
import { AuthContext } from "../../../services/auth/auth.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { fontSizes, spacing } from "../../../utils/sizes";

export default function SettingsScreen({ navigation }) {
    const { user, logout } = useContext(AuthContext)
    const { clearFavourites } = useContext(FavouritesContext)

    const [profilePhoto, setProfilePhoto] = useState(null)

    useFocusEffect(
        useCallback(() => {
            getProfilePicture()
        }, [user])
    );

    const getProfilePicture = async () => {
        setProfilePhoto(await AsyncStorage.getItem(`${user.uid}-photo`))
    }

    const onClearFavourites = () => {
        Alert.alert('Clear Favourites?', 'This action will delete all of your favourites', [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Clear",
                onPress: async () => clearFavourites()
            }
        ])
    }

    const onLogout = () => {
        Alert.alert('Are you sure you want to logout?', 'This action will log you out', [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Logout",
                onPress: async () => logout()
            }
        ])
    }

    return (
        <SafeAreaView>
            <View style={styles.avatarCon}>
                <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
                    {profilePhoto && <Avatar.Image size={120} style={styles.avatarIcon} color="black" source={{ uri: profilePhoto }} />}
                    {!profilePhoto && <Avatar.Icon size={120} style={styles.avatarIcon} color="black" icon="account-circle" />}
                </TouchableOpacity>
                <Text style={styles.avatarEmail}>{user.email}</Text>
            </View>
            <List.Section>
                <List.Item
                    style={styles.item}
                    title="Clear Favourites"
                    description="Delete all of your favourites"
                    left={(props) => <List.Icon {...props} color="black" icon='trash-can' />}
                    onPress={() => onClearFavourites()}
                />
                {/* <List.Item
                    style={styles.item}
                    title="Search History"
                    left={(props) => <List.Icon {...props} color="black" icon='history' />}
                    onPress={() => null}
                /> */}
                {/* <List.Item
                    style={styles.item}
                    title="Clear Storage"
                    left={(props) => <List.Icon {...props} color="black" icon='trash-can' />}
                    onPress={() => AsyncStorage.clear()}
                /> */}
                <List.Item
                    style={styles.item}
                    title="Logout"
                    left={(props) => <List.Icon {...props} color="black" icon='login' />}
                    onPress={() => onLogout()}
                />
            </List.Section>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    avatarCon: {
        padding: spacing.md,
        alignItems: 'center',
    },
    avatarIcon: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'grey',
    },
    avatarEmail: {
        color: 'black',
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'Oswald-VariableFont_wght',
    },
    item: {
        color: isDarkMode ? 'white' : 'black',
        padding: spacing.md
    },
});