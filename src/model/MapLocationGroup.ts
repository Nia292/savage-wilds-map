import {MapLocation} from "./MapLocation";

export interface MapLocationGroup {
    // Unique ID of this location group
    id: string;
    // Name of this group, e.g. "Giant Crocodile"
    name: string;
    // Type of the location group
    type: LocationGroupType;
    // If available, funcom ID of this object
    funcomId: string;
    // A general description on where to find this lcation
    locationDescription?: string;
    // Actual locations
    locations: MapLocation[];
}

export enum LocationGroupType {
    BOSS = 'BOSS',
    RESOURCE_ORE = 'RESOURCE_ORE',
    RESOURCE_PLANT = 'RESOURCE_PLANT',
    RESOURCE_MUSHROOM = 'RESOURCE_MUSHROOM',
    POINT_OF_INTEREST = 'POINT_OF_INTEREST',
    RUIN = "RUIN",
    DUNGEON = "DUNGEON",
    THRALL_CAMP_BLACK_HAND = "THRALL_CAMP_BLACK_HAND",
    THRALL_CAMP_DARFARI = "THRALL_CAMP_DARFARI",
    THRALL_CAMP_DARFARI_CAPITAL = "THRALL_CAMP_DARFARI_CAPITAL",
    THRALL_CAMP_RELIC_HUNTERS = "THRALL_CAMP_RELIC_HUNTERS",
    THRALL_CAMP_RELIC_HUNTERS_CAPITAL = "THRALL_CAMP_RELIC_HUNTERS_CAPITAL",
    FEAT = "FEAT",
    STAMP = "STAMP",
    CAVE = "CAVE",
    THRALL_CAMP_LEMURIAN = "THRALL_CAMP_LEMURIAN",
    THRALL_CAMP_LEMURIAN_CAPITAL = "THRALL_CAMP_LEMURIAN_CAPITAL",
    YMIR = "YMIR",
    ANIMAL = "ANIMAL",
    THRALL_CAMP_JHEBBAL = "THRALL_CAMP_JHEBBAL",
    THRALL_CAMP_PIRATE = "THRALL_CAMP_PIRATE",
    THRALL_CAMP_EXILE = "THRALL_CAMP_EXILE",
}

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
        case LocationGroupType.THRALL_CAMP_DARFARI_CAPITAL:
            return 'icon_darfari_capital.png';
        case LocationGroupType.THRALL_CAMP_DARFARI:
            return 'icon_darfari.png';
        case LocationGroupType.THRALL_CAMP_RELIC_HUNTERS:
            return 'icon_relic_hunter.png';
        case LocationGroupType.THRALL_CAMP_RELIC_HUNTERS_CAPITAL:
            return 'icon_relic_hunter_capital.png';
        case LocationGroupType.FEAT:
            return 'icon_feat.png';
        case LocationGroupType.STAMP:
            return 'icon_stamp.png';
        case LocationGroupType.CAVE:
            return 'icon_cave.png';
        case LocationGroupType.THRALL_CAMP_LEMURIAN:
            return 'icon_lemurian.png';
        case LocationGroupType.THRALL_CAMP_LEMURIAN_CAPITAL:
            return 'icon_lemurian_capital.png';
        case LocationGroupType.YMIR:
            return 'icon_ymir.png';
        case LocationGroupType.ANIMAL:
            return 'icon_animal.png';
        case LocationGroupType.THRALL_CAMP_JHEBBAL:
            return 'icon_jhebbal.png';
        case LocationGroupType.THRALL_CAMP_PIRATE:
            return 'icon_pirate.png';
        case LocationGroupType.THRALL_CAMP_EXILE:
            return 'icon_camp.png';
    }
    console.error('Failed to determine icon for ', location)
    return '';
}
