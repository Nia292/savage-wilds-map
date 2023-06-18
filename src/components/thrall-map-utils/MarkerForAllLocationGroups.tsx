import {LocationGroupType, MapLocationGroup} from "../../model/MapLocationGroup";
import React from "react";
import {MapLocation} from "../../model/MapLocation";
import {Marker, Tooltip} from "react-leaflet";
import {ceCoordinateToLatLng} from "../../util/conversions";
import {makeIcon} from "../../util/icon";

interface MarkerLocation {
    x: number;
    y: number;
    z: number;
    names: string[];
    type?: LocationGroupType;
}

function sharesLocation(location: MarkerLocation, tLocation: MapLocation): boolean {
    const dX = Math.abs(location.x - tLocation.x);
    const dY = Math.abs(location.y - tLocation.y);
    return dX <= 0.005 && dY <= 0.005;
}

function addLocationToList(locations: MarkerLocation[], tLocation: MapLocation, thrall: MapLocationGroup): void {
    const matchingLocation = locations.find(value => sharesLocation(value, tLocation))
    if (matchingLocation) {
        matchingLocation.names.push(thrall.name);
    } else {
        locations.push({
            x: tLocation.x,
            y: tLocation.y,
            z: tLocation.z,
            names: [thrall.name],
            type: tLocation.type,
        })
    }
}


function makeMarkerForLocation(location: MarkerLocation) {
    const latLng = ceCoordinateToLatLng(location);
    return <Marker key={latLng.lat + '_' + latLng.lng}
                   icon={makeIcon(location)}
                   position={latLng}>
        <Tooltip direction="bottom">
            <div className="display-in-column">
                {location.names.map(name => <div key={name}>{name}</div>)}
            </div>
        </Tooltip>
    </Marker>
}

function gatherMarkerLocations(thralls: MapLocationGroup[]): MarkerLocation[] {
    const result: MarkerLocation[] = [];
    thralls.forEach(thrall => {
        thrall.locations.forEach(loc => addLocationToList(result, loc, thrall))
    })
    return result;
}

export function MarkerForAllLocationGroups(props: {thralls: MapLocationGroup[], focused: boolean}) {
    if (props.focused) {
        return <React.Fragment/>;
    }
    const data = gatherMarkerLocations(props.thralls)
        .map(value => makeMarkerForLocation(value));
    return <React.Fragment>
        {data}
    </React.Fragment>
}
