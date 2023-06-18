import {MapLocationGroup} from "../../model/MapLocationGroup";
import {Marker, Tooltip} from "react-leaflet";
import React from "react";
import {ceCoordinateToLatLng} from "../../util/conversions";
import {HoveredThrallLocation} from "../../model/HoveredThrallLocation";
import {MapLocation} from "../../model/MapLocation";
import {makeIcon} from "../../util/icon";

function makeMarkerForLocation(thrall: MapLocationGroup, location: MapLocation, onHoverChange: (location?: HoveredThrallLocation) => void) {
    const onMouseOver = () => {
        onHoverChange({location: location, thrall: thrall});
    }

    const onMouseOut = () => {
        onHoverChange(undefined);
    }
    const position = ceCoordinateToLatLng(location);
    return <Marker key={position.lat + '_' + position.lng}
                   eventHandlers={{mouseover: onMouseOver, mouseout: onMouseOut}}
                   icon={makeIcon(location)}
                   position={position}>
        <Tooltip direction="bottom">{location.location}</Tooltip>
    </Marker>
}

export interface MarkerForSelectedThrallsProps {
    thrall?: MapLocationGroup;
    focused: boolean;
    onHoveredChange(location?: HoveredThrallLocation): void;
}

export function MarkerForSelectedThrall(props: MarkerForSelectedThrallsProps): any {
    if (!props.focused) {
        return <React.Fragment/>;
    }
    const thrall = props.thrall;
    if (!thrall) {
        return <React.Fragment/>;
    }
    return thrall.locations.map(location => makeMarkerForLocation(thrall, location, props.onHoveredChange));
}
