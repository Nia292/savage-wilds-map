import {determineIcon, MapLocation} from "../model/MapLocation";
import {icon, Icon} from "leaflet";

export function makeIcon(location: MapLocation): Icon {
    return icon({
        iconUrl: process.env.PUBLIC_URL + '/fc_assets/' + determineIcon(location),
        iconSize: [24, 24],
        tooltipAnchor: [0, 12],
    });
}