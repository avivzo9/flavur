import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { fontSizes, spacing } from "../../../utils/sizes";
import BackgroundImgView from '../cmps/BackgroundImgView';
import LottieView from 'lottie-react-native';

export default function AccountScreen({ navigation }) {
    return (
        <BackgroundImgView style={styles.accountCon}>
            <View style={styles.animationCon}>
                <LottieView style={styles.gif} source={require('../../../assets/loginGif.json')} autoPlay loop />
            </View>
            <View>
                <Text style={styles.header}>F l a v u r</Text>
            </View>
            <View style={styles.accountMenu}>
                <Button style={styles.button} labelStyle={{ width: '60%' }} color="black" icon="login" mode="contained" onPress={() => navigation.navigate("login")}>login</Button>
                <Button style={styles.button} labelStyle={{ width: '60%' }} color="black" icon="login" mode="contained" onPress={() => navigation.navigate("register")}>signup</Button>
                <Button style={styles.button} labelStyle={{ width: '60%' }} color="black" icon="login" mode="contained" onPress={() => navigation.navigate("login", 'guestMode')}>guest</Button>
            </View>
        </BackgroundImgView>
    )
}

const styles = StyleSheet.create({
    accountCon: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accountMenu: {
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: spacing.xxxl,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: spacing.md,
        borderRadius: 10
    },
    button: {
        padding: 5,
        width: '80%',
        height: 50,
        margin: spacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    header: {
        color: 'white',
        fontSize: fontSizes.xl,
        textAlign: 'center',
        padding: spacing.md
    },
    animationCon: {
        width: '100%',
        height: '35%',
        position: 'absolute',
        top: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
});