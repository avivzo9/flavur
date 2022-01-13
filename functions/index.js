const functions = require("firebase-functions");
const { geocodeRequest } = require('./geocode');
const { placesRequest } = require("./places");

const { Client } = require("@googlemaps/google-maps-services-js");
const { placesDetailsRequest } = require("./placeDetails");
const client = new Client({})

const KEY = functions.config().google.key

exports.geocode = functions.https.onRequest((request, response) => {
    geocodeRequest(request, response, client, KEY);
});

exports.placesNearBy = functions.https.onRequest((request, response) => {
    placesRequest(request, response, client, KEY);
});

exports.getPlaceDetails = functions.https.onRequest((request, response) => {
    placesDetailsRequest(request, response, client, KEY);
});