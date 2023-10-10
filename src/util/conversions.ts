import {LatLng, LatLngBounds, LatLngBoundsExpression, LatLngLiteral, Polygon, Polyline} from "leaflet";
import {MapLocation} from "../model/MapLocation";
import {MapOffset} from "../model/MapOffset";

export interface CeCoordinateLiteral {
    x: number;
    y: number;
    z: number;
}

export function ceCoordinateToLatLng(ceCoordinate: CeCoordinateLiteral): LatLngLiteral {
    return {
        // Because coordinates are in pixel space, the y-axis goes from negative (bot) to positive (top),
        // where as in CE it goes from positive(bot) to negative(top)
        // So we need to invert it.
        lat: -1 * ceCoordinate.y,
        lng: ceCoordinate.x
    }
}

export function latLngToCeCoordinate(latLng: LatLngLiteral): CeCoordinateLiteral {
    return {
        // Because coordinates are in pixel space, the y-axis goes from negative (bot) to positive (top),
        // where as in CE it goes from positive(bot) to negative(top)
        // So we need to invert it.
        y: -1 * latLng.lat,
        x: latLng.lng,
        z: -1
    }
}

export function findCenter(locations: MapLocation[]): LatLngLiteral| null {
    if (locations.length <= 0) {
        return null;
    }
    if (locations.length <= 1) {
        return ceCoordinateToLatLng(locations[0])
    }
    if (locations.length <= 2) {
        const latLngs = locations.map(value => ceCoordinateToLatLng(value));
        return new Polyline(latLngs).getBounds().getCenter();
    }
    const latLngs = locations.map(value => ceCoordinateToLatLng(value));
    const polygon = new Polygon(latLngs);
    return polygon.getBounds().getCenter();
}


export function calculateBounds(south: number, west: number, north: number, east: number, offset: MapOffset): LatLngBoundsExpression {
    const southWest: LatLng = new LatLng(south - offset.offsetBot, west - offset.offsetLeft);
    const northEast: LatLng = new LatLng(north - offset.offsetTop, east - offset.offsetRight);
    return  new LatLngBounds(
        southWest,
        northEast
    );
}
