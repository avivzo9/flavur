import { mocks } from "./mock"

export async function getRestaurants(location) {
    try {
        return new Promise((res, rej) => {
            const mock = mocks[location]
            if (!mock) rej('not found')
            res(mock.results)
        })
    } catch (err) {
        console.log('err:', err)
    }
}