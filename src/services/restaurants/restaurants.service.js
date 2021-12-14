import { isMock } from "../app.config";

export async function getRestaurants(location) {
    try {
        const restaurants = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/placesNearBy?location=${location}&mock=${isMock}`)
        const { results } = await restaurants.json();
        return results;
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