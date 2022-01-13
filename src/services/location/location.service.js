import { saveToStorage } from "../../utils/storage";

const KEY = '@location'

export async function getLocation(search, isMock) {
    try {
        const location = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/geocode?city=${search}&mock=${String(isMock)}`)
        const { results } = await location.json();
        if (results && !isMock) await saveToStorage(KEY + search, results)
        return results;
    } catch (err) {
        console.log('err:', err)
    }
}