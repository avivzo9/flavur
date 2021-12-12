const { mocks, addMockImages } = require('./mock')
const url = require('url')

module.exports.placesRequest = (request, response) => {
    const { location } = url.parse(request.url, true).query;
    const data = mocks[location]
    if (!data) return
    data.results = data.results.map((rest) => addMockImages(rest))
    response.json(data)
}