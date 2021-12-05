import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { fontSizes, spacing } from '../../../utils/sizes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../services/auth/auth.context';

export default function CameraScreen({ navigation }) {
    const { user } = useContext(AuthContext)

    const [isFlash, setIsFlash] = useState(false)
    const [isFlashOn, setIsFlashOn] = useState(false)
    const [isBackCam, setIsBackCam] = useState(false)
    const [photo, setPhoto] = useState(null)
    let camera = null

    const takePicture = async () => {
        if (isFlash && !isBackCam) setIsFlashOn(true)
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            if (data && data.uri) setPhoto(data.uri)
        }
        setIsFlashOn(false)
    };

    const saveProfilePhoto = async () => {
        await AsyncStorage.setItem(`${user.uid}-photo`, photo)
        navigation.goBack()
    }

    return (
        <>
            {photo && <View style={styles.container}>
                <Image style={styles.img} source={{ uri: photo }} />
                <View style={styles.optionsCon}>
                    <TouchableOpacity onPress={() => setPhoto(null)} style={styles.capture}>
                        <Text style={styles.textOption}> <Ionicons name="repeat-outline" size={24} color={'red'} /> </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => saveProfilePhoto()} style={styles.capture}>
                        <Text style={styles.textOption}> <Ionicons name="checkmark-outline" size={24} color={'red'} /> </Text>
                    </TouchableOpacity>
                </View>
            </View>}
            {!photo && <View style={styles.container}>
                {isFlashOn && <View style={styles.flashScreen}></View>}
                <RNCamera
                    ref={ref => camera = ref}
                    style={styles.preview}
                    type={isBackCam ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                    flashMode={isFlash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                />
                <View style={styles.optionsCon}>
                    <TouchableOpacity onPress={() => setIsFlash(!isFlash)} style={styles.capture}>
                        <Ionicons name={isFlash ? "flash" : "flash-outline"} size={24} color={'red'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => takePicture()} style={styles.capture}>
                        <Ionicons name="camera-outline" size={24} color={'red'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsBackCam(!isBackCam)} style={styles.capture}>
                        <Ionicons name="camera-reverse-outline" size={24} color={'red'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.capture}>
                        <Ionicons name="exit-outline" size={24} color={'red'} />
                    </TouchableOpacity>
                </View>
            </View>}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    optionsCon: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        bottom: 0
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: spacing.md,
        paddingHorizontal: 20,
        margin: spacing.md,
    },
    textOption: {
        fontSize: fontSizes.md,
        color: 'black',
        fontFamily: 'Lato-Regular'
    },
    img: {
        width: '100%',
        height: '100%'
    },
    flashScreen: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 99
    },
});