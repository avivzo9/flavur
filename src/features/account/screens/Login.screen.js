import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { AuthContext } from "../../../services/auth/auth.context";
import { fontSizes, spacing } from "../../../utils/sizes";
import FadeInView from "../../animations/fade.animation";
import Loader from "../../Loader";
import BackgroundImgView from '../cmps/BackgroundImgView'

export default function LoginScreen({ navigation, route }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, errorMsg, isLoading } = useContext(AuthContext)

    useEffect(() => {
        if (route.params) login('guest@guest.com', 'guest123')
    }, [])

    return (
        <BackgroundImgView>
            <View>
                <Text style={styles.header}>F l a v u r</Text>
            </View>
            {isLoading && <View style={styles.loginCon}><Loader /></View>}
            {!isLoading && <View style={styles.loginCon}>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={txt => setEmail(txt)}
                    style={styles.inputField}
                    keyboardType="email-address"
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={txt => setPassword(txt)}
                    style={styles.inputField}
                    secureTextEntry
                />
                {errorMsg && <FadeInView><Text style={styles.errMsg}>{errorMsg}</Text></FadeInView>}
                <Button style={styles.button} color="black" icon="login" mode="contained" onPress={() => login(email, password)}>login</Button>
            </View>}
            <Button style={styles.button} color="white" icon="step-backward" mode="contained" onPress={() => navigation.goBack()}>back</Button>
        </BackgroundImgView >
    )
}

const styles = StyleSheet.create({
    loginCon: {
        width: 300,
        minHeight: 260,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: spacing.md,
        borderRadius: 10,
        marginBottom: spacing.sm
    },
    inputField: {
        margin: spacing.sm
    },
    button: {
        padding: 5,
        width: 140,
        height: 50,
        margin: spacing.sm,
        alignSelf: 'center'
    },
    errMsg: {
        color: 'red',
        fontSize: fontSizes.md,
        textAlign: 'center',
        padding: spacing.sm
    },
    header: {
        color: 'white',
        fontSize: fontSizes.xl,
        textAlign: 'center',
        padding: spacing.md
    },
});