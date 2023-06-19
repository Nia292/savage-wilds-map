import {MapLocation} from "../model/MapLocation";
import {icon, Icon} from "leaflet";
import {determineIcon} from "../model/MapLocationGroup";


export function makeIcon(location: MapLocation): Icon {
    return icon({
        iconUrl: process.env.PUBLIC_URL + '/fc_assets/' + determineIcon(location),
        iconSize: [24, 24],
        tooltipAnchor: [0, 12],
    });
}

export function makeLargeIcon(location: MapLocation): Icon {
    return icon({
        iconUrl: process.env.PUBLIC_URL + '/fc_assets/' + determineIcon(location),
        iconSize: [48, 48],
        tooltipAnchor: [0, 24],
    });
}