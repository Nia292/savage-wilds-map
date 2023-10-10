import {CeCoordinateLiteral} from "../util/conversions";

export interface MapArea {
    id: string;
    color: string;
    tooltip: string;
    points: CeCoordinateLiteral[];
}