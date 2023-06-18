import {MapLocation} from "../model/MapLocation";
import {icon, Icon} from "leaflet";
import {LocationGroupType} from "../model/MapLocationGroup";

export function determineIcon(location: MapLocation): string {
    switch (location.type) {
        case LocationGroupType.BOSS:
            return 'icon_worldboss.png';
        case LocationGroupType.RESOURCE_ORE:
            return 'icon_mineral.png';
        case LocationGroupType.POINT_OF_INTEREST:
            return 'icon_vista.png';
        case LocationGroupType.RESOURCE_PLANT:
            return 'icon_plant.png';
        case LocationGroupType.RUIN:
            return 'icon_ruin.png';
        case LocationGroupType.DUNGEON:
            return 'icon_vault.png';
        case LocationGroupType.THRALL_CAMP_BLACK_HAND:
            return 'icon_black_hand.png';
    }
    console.error('Failed to determine icon for ', location)
    return '';
}



export function makeIcon(location: MapLocation): Icon {
    return icon({
        iconUrl: process.env.PUBLIC_URL + '/fc_assets/' + determineIcon(location),
        iconSize: [24, 24],
        tooltipAnchor: [0, 12],
    });
}