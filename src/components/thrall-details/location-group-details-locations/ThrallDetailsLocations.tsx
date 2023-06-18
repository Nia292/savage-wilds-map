import {MapLocationGroup} from "../../../model/MapLocationGroup";
import {determineIcon, MapLocation} from "../../../model/MapLocation";
import './LocationGroupDetailsLocations.css';
import React from "react";
import {HoveredThrallLocation} from "../../../model/HoveredThrallLocation";

interface LocationGroupDetailsLocationsProps {
    location: MapLocation;
    isHovered: boolean;
    onSelectLocation(location: MapLocation): void;
}

export interface ThrallDetailsLocationsProps {
    thrall?: MapLocationGroup;
    hoveredLocation?: HoveredThrallLocation;
    onSelectLocation(location: MapLocation): void;
}

const LocationGroupDetailsLocations = (props: LocationGroupDetailsLocationsProps) => {
    let classNames = 'thrall-detail-single-location';
    if (props.isHovered) {
        classNames += ' thrall-details-single-location__highlight';
    }
    return <div
        onClick={() => props.onSelectLocation(props.location)}
        className={classNames}>
        <div className="display-in-row display-in-center ">
            <div style={{marginRight: '16px'}}>
                <img alt="icon camp" src={process.env.PUBLIC_URL + "/fc_assets/" + determineIcon(props.location)}/>
            </div>
            <div style={{marginRight: 'auto'}}>
                <div style={{fontSize: '14pt'}}>{props.location.location}</div>
                <div style={{fontSize: '11pt'}}>{props.location.spawnSpot}</div>
                <div style={{fontSize: '9pt'}}>{props.location.spawnSpotDetail}</div>
                <div style={{fontSize: '9pt'}}>Coordiantes: {props.location.x} / {props.location.y} / {props.location.z}</div>
            </div>
        </div>
    </div>
}

function isLocationHovered(thrallLocation: MapLocation, hoveredLocation?: HoveredThrallLocation, thrall?: MapLocationGroup): boolean {
    if (!hoveredLocation || !thrall) {
        return false;
    }
    const {x, y, z} = hoveredLocation.location;
    return thrall.id === hoveredLocation.thrall.id && thrallLocation.x === x && thrallLocation.y === y && thrallLocation.z === z;
}

export const ThrallDetailsLocations = (props: ThrallDetailsLocationsProps) => {
    return  <div className="thrall-location-list-container">
        <div>
            <div className="thrall-location-list-header">
                Locations
            </div>
            <div className="thrall-location-list-subheader">
                Click a location to jump to it
            </div>
            <div className="thrall-details-locations">
                {props.thrall?.locations.map((value, index) => <LocationGroupDetailsLocations
                    onSelectLocation={props.onSelectLocation}
                    isHovered={isLocationHovered(value, props.hoveredLocation, props?.thrall)}
                    key={index}
                    location={value}/> )}
            </div>
        </div>
    </div>
}
