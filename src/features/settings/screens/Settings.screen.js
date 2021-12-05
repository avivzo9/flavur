import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useContext, useState } from "react"
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../../services/auth/auth.context";
import { fontSizes, spacing } from "../../../utils/sizes";

export default function SettingsScreen({ navigation }) {
    const { user, logout } = useContext(AuthContext)

    const [profilePhoto, setProfilePhoto] = useState(null)

    useFocusEffect(
        useCallback(() => {
            getProfilePicture()
        }, [user])
    );

    const getProfilePicture = async () => {
        setProfilePhoto(await AsyncStorage.getItem(`${user.uid}-photo`))
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
                    style={{ padding: spacing.md }}
                    title="Favourites"
                    description="View your favourites"
                    left={(props) => <List.Icon {...props} color="black" icon='heart' />}
                    onPress={() => navigation.navigate("favourites")}
                />
                <List.Item
                    style={{ padding: spacing.md }}
                    title="Logout"
                    left={(props) => <List.Icon {...props} color="black" icon='login' />}
                    onPress={() => logout()}
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
        fontSize: fontSizes.md,
        marginTop: 10,
        fontFamily: 'Oswald-VariableFont_wght',
    }
});