import AsyncStorage from "@react-native-async-storage/async-storage"

export const saveToStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
        console.log('err:', err)
    }
}

export const loadFromStorage = async (key) => {
    try {
        const loadedValue = await AsyncStorage.getItem(key)
        if (loadedValue && JSON.parse(loadedValue).length) return JSON.parse(loadedValue)
    } catch (err) {
        console.log('err:', err)
    }
}