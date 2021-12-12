export async function getLocation(search) {
    try {
        const location = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/geocode?city=${search}`)
        const { results } = await location.json();
        return results;
    } catch (err) {
        console.log('err:', err)
    }
}