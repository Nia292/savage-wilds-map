import {LocationGroupType} from "./MapLocationGroup";

/**
 * A Conan Exiles coordinate.
 *
 * If converting from // TeleportPlayer, the coordinates are x, y and z.
 * So:
 * // TeleportPlayer x y z
 */
export interface MapLocation {
    x: number;
    y: number;
    z: number;
    // Spawns in place of which thrall type?
    spawnSpot?: string;
    spawnSpotDetail?: string;
    type?: LocationGroupType;
    // Name of the general area
    location?: string;

    /**
     * An ID, generated upon loading, to uniquely identify this location for the current runtime
     */
    generatedId?: string;
}