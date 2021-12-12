export async function getRestaurants(location) {
    try {
        const restaurants = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/placesNearBy?location=${location}`)
        const { results } = await restaurants.json();
        return results;
    } catch (err) {
        console.log('err:', err)
    }
}