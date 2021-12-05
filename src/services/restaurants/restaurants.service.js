import { mockImages, mocks } from "./mock"

export async function getRestaurants(location) {
    try {
        return new Promise((res, rej) => {
            const mock = mocks[location]
            if (!mock) rej('not found')
            mock.results.map((rest) => rest.photos = rest.photos.map((_) => mockImages[Math.ceil(Math.random() * mockImages.length - 1)]))
            res(mock.results)
        })
    } catch (err) {
        console.log('err:', err)
    }
}