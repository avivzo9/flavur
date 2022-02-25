import { loadFromStorage, saveToStorage } from "../../utils/storage";

const RESTAURANT_KEY = '@restaurants'

export async function getRestaurants(location, isMock, radius) {
    const KEY = RESTAURANT_KEY + location + radius
    try {
        const storage = await loadFromStorage(KEY)
        if (storage && storage.length) return storage;
        const restaurants = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/placesNearBy?location=${location}&mock=${String(isMock)}&radius=${(radius * 10000).toFixed(0)}`)
        let { results } = await restaurants.json();
        let restsToReturn = []
        results.map((result) => {
            if (!result) return
            restsToReturn.push(result)
        })
        if (!isMock) restsToReturn = await addDetails(restsToReturn)
        await saveToStorage(KEY, restsToReturn)
        return restsToReturn;
    } catch (err) {
        console.error('err in getRestaurants:', err)
    }
}

async function addDetails(restaurants) {
    try {
        const promises = restaurants.map(async (rest) => {
            const details = await getRestaurantDetailsByPlaceId(rest.place_id)
            if (!details.result || !Object.keys(details)) return rest;
            if (details.result.photos.length) rest.photos = details.result.photos
            if (details.result.opening_hours) rest.opening_hours = details.result.opening_hours
            rest.reviews = details.result.reviews
            rest.price_level = details.result.price_level
            rest.url = details.result.url
            rest.website = details.result.website
            rest.formatted_phone_number = details.result.formatted_phone_number
            return rest;
        })
        return await Promise.all(promises)
    } catch (err) {
        console.error('err in addDetails:', err)
    }
}

// async function addDetails(restaurants) {
//     try {
//         const restaurantsToReturn = []
//         for (let i in restaurants) {
//             const details = await getRestaurantDetailsByPlaceId(restaurants[i].place_id)
//             if (!details.result) return
//             if (details.result.photos.length) restaurants[i].photos = details.result.photos
//             if (details.result.opening_hours) restaurants[i].opening_hours = details.result.opening_hours
//             restaurants[i].reviews = details.result.reviews
//             restaurants[i].price_level = details.result.price_level
//             restaurants[i].url = details.result.url
//             restaurants[i].website = details.result.website
//             restaurants[i].formatted_phone_number = details.result.formatted_phone_number
//             restaurantsToReturn.push(restaurants[i])
//         }
//         return restaurantsToReturn;
//     } catch (err) {
//         console.error('err in addDetails:', err)
//     }
// }

export async function getRestaurantDetailsByPlaceId(placeId) {
    try {
        const details = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/getPlaceDetails?placeId=${placeId}`)
        return await details.json();
    } catch (err) {
        console.error('err in getRestaurantDetails:', err)
    }
}