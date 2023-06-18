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
}
