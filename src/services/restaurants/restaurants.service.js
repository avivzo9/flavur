import { loadFromStorage, saveToStorage } from "../../utils/storage";

const KEY = '@restaurants'

export async function getRestaurants(location, isMock, radius) {
    try {
        const storage = await loadFromStorage(KEY + location)
        if (storage && storage.length) {
            console.log('Load restaurants from storage!');
            return storage;
        }
        console.log('Load restaurants from API!');
        const restaurants = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/placesNearBy?location=${location}&mock=${String(isMock)}&radius=${(radius * 10000).toFixed(0)}`)
        let { results } = await restaurants.json();
        let restsToReturn = null
        if (!isMock) restsToReturn = await addDetails(results)
        await saveToStorage(KEY + location, restsToReturn)
        return restsToReturn;
    } catch (err) {
        console.log('err in getRestaurants:', err)
    }
}

async function addDetails(restaurants) {
    try {
        const restaurantsToReturn = []
        for (let i in restaurants) {
            if (!restaurants[i] || !restaurants[i].photos || !restaurants[i].photos.length) return
            else {
                const details = await getRestaurantDetailsByPlaceId(restaurants[i].place_id)
                if (!details.result || !details.result.photos.length) return
                restaurants[i].opening_hours = details.result.opening_hours
                restaurants[i].reviews = details.result.reviews
                restaurants[i].url = details.result.url
                restaurants[i].website = details.result.website
                restaurants[i].photos = details.result.photos
                restaurants[i].formatted_phone_number = details.result.formatted_phone_number
                restaurantsToReturn.push(restaurants[i])
            }
        }
        return restaurantsToReturn;
    } catch (err) {
        console.log('err in addDetails:', err)
    }
}

export async function getRestaurantDetailsByPlaceId(placeId) {
    try {
        const details = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/getPlaceDetails?placeId=${placeId}`)
        return await details.json();
    } catch (err) {
        console.log('err in getRestaurantDetails:', err)
    }
}