import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useContext, useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppConfigContext } from "../../../services/appConfig/appConfig.context";
import { AuthContext } from "../../../services/auth/auth.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { colors } from "../../../utils/colors";
import { spacing } from "../../../utils/sizes";
import FadeInView from "../../animations/fade.animation";
import UpdatePassword from "../cmps/UpdatePasswordForm.cmp";

export default function SettingsScreen({ navigation }) {
    const { isDarkMode, setIsDarkMode, isMock, setIsMock } = useContext(AppConfigContext)
    const { user, logout, updatePassword } = useContext(AuthContext)
    const { clearFavorites } = useContext(FavoritesContext)

    const [profilePhoto, setProfilePhoto] = useState(null)
    const [isUpdatePassword, setIsUpdatePassword] = useState(false)

    useFocusEffect(
        useCallback(() => {
            getProfilePicture()
        }, [user])
    );

    const getProfilePicture = async () => {
        setProfilePhoto(await AsyncStorage.getItem(`${user.uid}-photo`))
    }

    const onClearFavorites = () => {
        Alert.alert('Clear Favorites?', 'This action will delete all of your favorites', [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Clear",
                onPress: async () => await clearFavorites()
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
                onPress: async () => await logout()
            }
        ])
    }

    const onUpdatePassword = async () => {

    }

    const logLocationStorage = async () => {
        console.log(await AsyncStorage.getItem('location'))
    }

    return (
        <SafeAreaView style={styles(isDarkMode).settingsContainer}>
            <View style={styles().avatarCon}>
                <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
                    {profilePhoto && <Avatar.Image size={120} style={[styles(isDarkMode).avatarImg, { transform: [{ scaleX: -1 }] }]} color={isDarkMode ? 'white' : 'black'} source={{ uri: profilePhoto }} />}
                    {!profilePhoto && <Avatar.Icon size={120} style={styles(isDarkMode).avatarImg} color={isDarkMode ? 'white' : 'black'} icon="account-circle" />}
                </TouchableOpacity>
                <Text style={[styles().avatarEmail, styles(isDarkMode).darkModeTxt]}>{user.email}</Text>
            </View>
            <FadeInView>
                <List.Section>
                    <List.Item
                        style={[styles().item, styles(isDarkMode).darkModeTxt]}
                        titleStyle={styles(isDarkMode).darkModeTxt}
                        descriptionStyle={styles(isDarkMode).darkModeTxt}
                        title="Dark Mode"
                        description={`Dark Mode is ${isDarkMode ? 'on' : 'off'}`}
                        left={(props) => <List.Icon {...props} color={isDarkMode ? 'white' : 'black'} icon='theme-light-dark' />}
                        onPress={() => setIsDarkMode(!isDarkMode)}
                    />
                    <List.Item
                        style={styles().item}
                        titleStyle={styles(isDarkMode).darkModeTxt}
                        descriptionStyle={styles(isDarkMode).darkModeTxt}
                        title="Clear Favorites"
                        description="Delete all of your favorites"
                        left={(props) => <List.Icon {...props} color={isDarkMode ? 'white' : 'black'} icon='trash-can' />}
                        onPress={() => onClearFavorites()}
                    />
                    {user.email != 'guest@guest.com' && <List.Item
                        style={[styles().item, styles(isDarkMode).darkModeTxt]}
                        titleStyle={styles(isDarkMode).darkModeTxt}
                        descriptionStyle={styles(isDarkMode).darkModeTxt}
                        title="Change password"
                        left={(props) => <List.Icon {...props} color={isDarkMode ? 'white' : 'black'} icon='lock' />}
                        onPress={() => setIsUpdatePassword(true)}
                    />}
                    <List.Item
                        style={[styles().item, styles(isDarkMode).darkModeTxt]}
                        titleStyle={styles(isDarkMode).darkModeTxt}
                        title="Logout"
                        left={(props) => <List.Icon {...props} color={isDarkMode ? 'white' : 'black'} icon='login' />}
                        onPress={() => onLogout()}
                    />
                    {user.email === 'avivzo9@gmail.com' && <>
                        <List.Item
                            style={[styles().item, styles(isDarkMode).darkModeTxt]}
                            titleStyle={styles(isDarkMode).darkModeTxt}
                            descriptionStyle={styles(isDarkMode).darkModeTxt}
                            title="Clear Storage"
                            left={(props) => <List.Icon {...props} color={isDarkMode ? 'white' : 'black'} icon='trash-can' />}
                            onPress={() => AsyncStorage.clear()}
                        />
                        <List.Item
                            style={[styles().item, styles(isDarkMode).darkModeTxt]}
                            titleStyle={styles(isDarkMode).darkModeTxt}
                            descriptionStyle={styles(isDarkMode).darkModeTxt}
                            title="Toggle Mock Mode"
                            description={`Mock Mode is ${isMock ? 'on' : 'off'}`}
                            left={(props) => <List.Icon {...props} color={isDarkMode ? 'white' : 'black'} icon={isMock ? 'toggle-switch' : 'toggle-switch-off'} />}
                            onPress={() => setIsMock(!isMock)}
                        />
                        <List.Item
                            style={[styles().item, styles(isDarkMode).darkModeTxt]}
                            titleStyle={styles(isDarkMode).darkModeTxt}
                            descriptionStyle={styles(isDarkMode).darkModeTxt}
                            title="Start location debug"
                            left={(props) => <List.Icon {...props} color={isDarkMode ? 'white' : 'black'} icon='android-debug-bridge' />}
                            onPress={() => logLocationStorage()}
                        />
                    </>}
                </List.Section>
            </FadeInView>
            {isUpdatePassword && <UpdatePassword setIsUpdatePassword={setIsUpdatePassword} />}
        </SafeAreaView>
    )
}

const styles = (isDark) => StyleSheet.create({
    settingsContainer: {
        height: '100%',
        backgroundColor: isDark ? colors.darkMode.dark : colors.darkMode.light,
    },
    avatarCon: {
        padding: spacing.md,
        alignItems: 'center',
    },
    avatarImg: {
        backgroundColor: isDark ? colors.darkMode.dark : colors.darkMode.light,
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    avatarEmail: {
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'Oswald-VariableFont_wght',
    },
    item: {
        padding: spacing.md
    },
    darkModeTxt: {
        color: isDark ? colors.darkMode.light : colors.darkMode.dark,
        opacity: isDark ? 0.9 : 1
    },
});