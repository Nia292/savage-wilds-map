import {MapLocationGroup} from "../../model/MapLocationGroup";
import React, {useEffect, useState} from "react";
import {MapLocation} from "../../model/MapLocation";
import {Marker, Polygon, Tooltip} from "react-leaflet";
import {ceCoordinateToLatLng} from "../../util/conversions";
import {makeIcon} from "../../util/icon";
import {MapArea} from "../../model/MapArea";

function makeMarkerForLocation(location: MapLocation) {
    const latLng = ceCoordinateToLatLng(location);
    return <Marker key={location.generatedId}
                   icon={makeIcon(location)}
                   position={latLng}>
        <Tooltip direction="bottom">
            <div className="display-in-column">
                {location.location}
            </div>
        </Tooltip>
    </Marker>
}

function makePolygonForArea(area: MapArea) {
    const latLngs = area.points.map(point => ceCoordinateToLatLng(point));
    return <Polygon pathOptions={{ color: area.color }} positions={latLngs} key={area.id}>
        <Tooltip direction="bottom">{area.tooltip}</Tooltip>
    </Polygon>
}

function gatherMarkerLocations(groups: MapLocationGroup[]): MapLocation[] {
    return groups.map(value => value.locations)
        .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
}

function gatherAreaLocations(groups: MapLocationGroup[]): MapArea[] {
    return groups.map(value => value.areas || [])
        .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
}

export function MarkerForAllLocationGroups(props: {locationGroups: MapLocationGroup[], focused: boolean}) {
    const [markers, setMarkers] = useState([] as React.ElementRef<any>[]);
    const [polygons, setPolygons] = useState([] as React.ElementRef<any>[]);
    // Moved into an effect to prevent excessive re-rendering whenever any of the input props change
    // this has caused significant performance hits in the past
    useEffect(() => {
        setMarkers(gatherMarkerLocations(props.locationGroups)
            .map(value => makeMarkerForLocation(value)));
        setPolygons(gatherAreaLocations(props.locationGroups)
            .map(value => makePolygonForArea(value)));
    }, [props.locationGroups]);
    if (props.focused) {
        return <React.Fragment/>;
    }
    return <React.Fragment>
        {markers}
        {polygons}
    </React.Fragment>
}
