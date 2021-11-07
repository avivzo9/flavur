import { mockLocations } from "./location.mock"

export async function getLocation(search) {
    try {
        return new Promise((res, rej) => {
            const location = mockLocations[search]
            if (!location) rej('not found')
            res(location.results[0])
        })
    } catch (err) {
        console.log('err:', err)
    }
}