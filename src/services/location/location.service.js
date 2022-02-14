import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveToStorage } from "../../utils/storage";

const KEY = '@location'

export async function getLocation(search, isMock) {
    try {
        const location = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/geocode?city=${search}&mock=${String(isMock)}`)
        const { results } = await location.json();
        if (results && !isMock) await saveToStorage(KEY + search, results)
        return results;
    } catch (err) {
        console.error('err in getLocation:', err)
    }
}

export async function saveLocationForDebug(obj) {
    try {
        const storage = await AsyncStorage.getItem('location')
        if (!storage || !storage.length) await AsyncStorage.setItem('location', JSON.stringify([obj]))
        else {
            storage.push(obj)
            await AsyncStorage.setItem('location', JSON.stringify(storage))
        }
    } catch (err) {
        console.log('err in saveLocationForDebug:', err)
    }
}