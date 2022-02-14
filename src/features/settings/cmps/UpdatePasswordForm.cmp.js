import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { fonts } from "../../../utils/fonts";
import { fontSizes, spacing } from "../../../utils/sizes";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppConfigContext } from "../../../services/appConfig/appConfig.context";
import { colors } from "../../../utils/colors";
import { AuthContext } from "../../../services/auth/auth.context";
import Loader from "../../Loader";
import FadeInView from "../../animations/fade.animation";

export default function UpdatePassword({ setIsUpdatePassword }) {
    const { isDarkMode } = useContext(AppConfigContext)
    const { login, isLoading, updatePassword } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isUpdateLoading, setIsUpdateLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoggedin, setIsLoggedIn] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const onLogin = async () => {
        try {
            if (!password || !password.length) {
                setErrorMsg('Please enter valid password')
                return
            }
            setIsUpdateLoading(true)
            const res = await login(email, password)
            if (res) {
                setIsLoggedIn(true)
                setErrorMsg(null)
            }
            else setErrorMsg('Incorrect email or password')
            setIsUpdateLoading(false)
        } catch (err) {
            console.log('Error in onLogin:', err)
        }
    }

    const onChangePassword = async () => {
        try {
            if (!newPassword || !newPassword.length) {
                setErrorMsg('Please enter valid password')
                return
            }
            setIsUpdateLoading(true)
            await updatePassword(newPassword)
            setIsSuccess(true)
            setTimeout(() => setIsUpdatePassword(false), 3000)
            setIsUpdateLoading(false)
        } catch (err) {
            console.log('Error in - onChangePassword:', err)
        }
    }

    return (
        <View style={styles(isDarkMode).container}>
            <View style={styles().headerCon}>
                <Text style={styles(isDarkMode).title}>{isLoggedin ? 'What\'s your new password?' : 'Please login first'}</Text>
                <Ionicons onPress={() => setIsUpdatePassword(false)} name={"close-sharp"} size={28} color={isDarkMode ? 'white' :'black'} />
            </View>
            {(isUpdateLoading || isLoading) && <View style={styles(isDarkMode).inputCon}><Loader /></View>}
            {(!isUpdateLoading || !isLoading) && <View style={styles(isDarkMode, isLoggedin).inputCon}>
                {!isLoggedin && <View style={styles().loginCon}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={txt => setEmail(txt)}
                        style={styles().inputField}
                        keyboardType="email-address"
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={txt => setPassword(txt)}
                        style={styles().inputField}
                        secureTextEntry
                    />
                    {errorMsg && <FadeInView><Text style={styles().errMsg}>{errorMsg}</Text></FadeInView>}
                    <Button style={styles().button} color="black" icon="login" mode="contained" onPress={() => onLogin()}>login</Button>
                </View>}
                {isLoggedin && <>
                    {!isSuccess && <><TextInput
                        label="Password"
                        value={newPassword}
                        onChangeText={txt => setNewPassword(txt)}
                        style={styles().inputField}
                        secureTextEntry
                    />
                        {errorMsg && <FadeInView><Text style={styles().errMsg}>{errorMsg}</Text></FadeInView>}
                        <Button style={styles().button} color="black" icon="login" mode="contained" onPress={onChangePassword}>change password</Button></>}
                    {isSuccess && <FadeInView><Text style={styles().success}>Success!</Text></FadeInView>}
                </>}
            </View>}
        </View>
    )
}

const styles = (isDarkMode, isLoggedin) => StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        padding: spacing.lg,
    },
    headerCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.md
    },
    title: {
        color: isDarkMode ? 'white' : 'black',
        fontSize: fontSizes.lg,
        textAlign: 'center',
        fontFamily: fonts.header
    },
    loginCon: {
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: spacing.md,
        borderRadius: 10,
        marginBottom: spacing.sm
    },
    inputCon: {
        backgroundColor: colors.darkMode.topDark,
        marginTop: 25,
        padding: spacing.md,
        borderRadius: 10,
        minHeight: isLoggedin ? 0 : 273
    },
    inputField: {
        marginBottom: spacing.md,
        borderRadius: 5,
        height: 60,
    },
    errMsg: {
        color: 'red',
        textAlign: 'center',
        marginBottom: spacing.md
    },
    button: {
        height: 50,
        justifyContent: 'center'
    },
    success: {
        color: 'white',
        fontSize: fontSizes.md,
        textAlign: 'center'
    },
})