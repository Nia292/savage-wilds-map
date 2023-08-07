const fs = require("fs");


const locationRegex = /(.*)\(X=(.*),Y=(.*),Z=(.*)\)/

function parseToLocation(value) {
    const result = locationRegex.exec(value);
    if (result) {
        return {
            location: result[1].trim(),
            spawnSpotDetail: "",
            type: "POINT_OF_INTEREST",
            source: `Imported: ${value}`,
            x: result[2],
            y: result[3],
            z: result[4],
        }
    }
    return null;
}

function getFromPointsOfInterest(pointsOfInterests, swLocation) {
    return pointsOfInterests.find(poi => poi.location.toLowerCase() === swLocation.location.toLowerCase())
}

// First we read all SW markers from the raw text file we have
const allSWMarkers = fs.readFileSync('./savage_wilds_map_markers.txt', {encoding: 'UTF-8'});
const allSWLocations = allSWMarkers.split('\n')
    .map(value => value.trim())
    .map(value => parseToLocation(value))
    .filter(value => value != null);

// With that, we can read the raw data.json and merge all locations in we don't have yet
const mapData = JSON.parse(fs.readFileSync('./../public/data.json', {encoding: 'UTF-8'}));
const pointOfInterests = mapData.data.filter(v => v.id === 'Points Of Interest');
if (pointOfInterests) {
    // Find missing entries
    for (let swLocation of allSWLocations) {
        const matchingMapLocation = getFromPointsOfInterest(pointOfInterests, swLocation);
        if (!matchingMapLocation) {
            console.log(`Location ${swLocation.location} is not yet in map, adding`);
            pointOfInterests.push(swLocation);
        }
    }
    // Replace /docs/data.json with a minified JSON
    const newDataAsJSON = JSON.stringify(mapData);
    fs.writeFileSync('./../docs/data.json', newDataAsJSON, {encoding: 'UTF-8'});
} else {
    console.warn('No points of interests found!');
}
