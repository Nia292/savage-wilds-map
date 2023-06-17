import {MapLocationGroup} from "../../model/MapLocationGroup";
import {Marker, Tooltip} from "react-leaflet";
import React from "react";
import {ceCoordinateToLatLng} from "../../util/conversions";
import {Icon, icon} from "leaflet";
import {HoveredThrallLocation} from "../../model/HoveredThrallLocation";
import {determineIcon, MapLocation} from "../../model/MapLocation";

function makeIcon(location: MapLocation): Icon {
    return icon({
        iconUrl: process.env.PUBLIC_URL + '/fc_assets/' + determineIcon(location),
        iconSize: [24, 24],
        tooltipAnchor: [0, 12],
    });
}

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
        <Tooltip direction="bottom">{thrall.name}</Tooltip>
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
