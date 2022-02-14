import auth from '@react-native-firebase/auth';

export const authService = {
    loginRequest,
    registerRequest,
    logoutRequest,
    updateAccountPassword
}

async function loginRequest(email, password) {
    try {
        return await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.log('err:', err)
    }
}

async function logoutRequest() {
    try {
        return await auth().signOut()
    } catch (err) {
        console.log('err:', err)
    }
}

async function registerRequest(email, password) {
    try {
        return await auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
        console.log('err:', err)
    }
}

async function updateAccountPassword(password) {
    try {
        return await auth().currentUser.updatePassword(password)
    } catch (err) {
        console.log('err:', err)
    }
}