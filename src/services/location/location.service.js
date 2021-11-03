import { mockLocations } from "./location.mock"

export async function getLocation(search) {
    console.log('getLocation - search:', search)
    try {
        return new Promise((res, rej) => {
            const location = mockLocations[search]
            if (!location) rej('not found')
            const { geometry } = location.results[0]
            res(geometry)
        })
    } catch (err) {
        console.log('err:', err)
    }
}