import {MapLocationGroup} from "../../model/MapLocationGroup";
import React from "react";
import {MapLocation} from "../../model/MapLocation";
import {Marker, Tooltip} from "react-leaflet";
import {ceCoordinateToLatLng} from "../../util/conversions";
import {makeIcon} from "../../util/icon";

function makeMarkerForLocation(location: MapLocation) {
    const latLng = ceCoordinateToLatLng(location);
    return <Marker key={latLng.lat + '_' + latLng.lng}
                   icon={makeIcon(location)}
                   position={latLng}>
        <Tooltip direction="bottom">
            <div className="display-in-column">
                {location.location}
            </div>
        </Tooltip>
    </Marker>
}

function gatherMarkerLocations(groups: MapLocationGroup[]): MapLocation[] {
    return groups.map(value => value.locations)
        .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
}

export function MarkerForAllLocationGroups(props: {locationGroups: MapLocationGroup[], focused: boolean}) {
    if (props.focused) {
        return <React.Fragment/>;
    }
    const data = gatherMarkerLocations(props.locationGroups)
        .map(value => makeMarkerForLocation(value));
    return <React.Fragment>
        {data}
    </React.Fragment>
}
