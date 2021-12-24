import { loadFromStorage, saveToStorage } from "../../utils/storage";
import { isMock } from "../app.config";

const KEY = '@location'

export async function getLocation(search) {
    try {
        const storage = await loadFromStorage(KEY + search)
        if (!storage && !isMock) {
            const location = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/geocode?city=${search}&mock=${String(isMock)}`)
            const { results } = await location.json();
            if (results && !isMock) await saveToStorage(KEY + search, results)
            return results;
        }
        return storage;
    } catch (err) {
        console.log('err:', err)
    }
}