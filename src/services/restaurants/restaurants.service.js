import { loadFromStorage, saveToStorage } from "../../utils/storage";
const noImage = require('../../assets/imgs/no_image.png')

const KEY = '@restaurants'

export async function getRestaurants(location, isMock, radius) {
    try {
        const storage = await loadFromStorage(KEY + location)
        if (!storage && !isMock) {
            const restaurants = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/placesNearBy?location=${location}&mock=${String(isMock)}&radius=${(radius * 10000).toFixed(0)}`)
            const { results } = await restaurants.json();
            if (!results) return Promise.reject('No results found')
            const restsToReturn = []
            results.map((rest) => {
                if (!rest) return
                else if (!rest.photos) rest.photos = [noImage]
                if (rest) restsToReturn.push(rest)
            })
            if (!isMock) await saveToStorage(KEY + location, restsToReturn)
            return restsToReturn;
        }
        return storage;
    } catch (err) {
        console.log('err in getRestaurants:', err)
    }
}

export async function getRestaurantDetails(placeId) {
    try {
        const details = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/getPlaceDetails?placeId=${placeId}`)
        return await details.json();
    } catch (err) {
        console.log('err in getRestaurantDetails:', err)
    }
}