import {determineIcon, MapLocationGroup} from "../../../model/MapLocationGroup";
import {MapLocation} from "../../../model/MapLocation";
import './LocationGroupDetailsLocations.css';
import React, {useEffect, useState} from "react";
import {HoveredThrallLocation} from "../../../model/HoveredThrallLocation";

interface LocationGroupDetailsLocationsProps {
    location: MapLocation;
    isHovered: boolean;

    onSelectLocation(location: MapLocation): void;
}

export interface ThrallDetailsLocationsProps {
    locationGroup?: MapLocationGroup;
    hoveredLocation?: HoveredThrallLocation;

    onSelectLocation(location: MapLocation): void;
}

const LocationGroupDetailsLocations = (props: LocationGroupDetailsLocationsProps) => {
    let classNames = 'location-details-single-location';
    if (props.isHovered) {
        classNames += ' location-details-single-location__highlight';
    }
    return <div
        onClick={() => props.onSelectLocation(props.location)}
        className={classNames}>
        <div className="display-in-row display-in-center ">
            <div style={{marginRight: '16px'}}>
                <img alt="icon camp" src={process.env.PUBLIC_URL + "/fc_assets/" + determineIcon(props.location)}/>
            </div>
            <div style={{marginRight: 'auto'}}>
                <div style={{fontSize: '16pt'}}>{props.location.location}</div>
                <div style={{fontSize: '13pt'}}>{props.location.spawnSpot}</div>
                <div style={{fontSize: '11pt'}}>{props.location.spawnSpotDetail}</div>
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
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        setSearchValue('');
    }, [props.locationGroup]);
    const locations = props.locationGroup?.locations
        .filter(v => v.location?.toLowerCase().includes(searchValue))
        .sort((a, b) => {
            const nA = a.location || '';
            const bA = b.location || '';
            return nA.localeCompare(bA);
        }) || [];
    return <div className="location-group-list-container">
        <div>
            <div className="location-group-list-search">
                <input className="map-input"
                       placeholder='Type to search'
                       value={searchValue} onChange={(v) => setSearchValue(v.target.value?.toLowerCase() || '')}></input>
            </div>
            <div className="location-group-details-locations">
                {locations.map((value, index) => <LocationGroupDetailsLocations
                    onSelectLocation={props.onSelectLocation}
                    isHovered={isLocationHovered(value, props.hoveredLocation, props?.locationGroup)}
                    key={index}
                    location={value}/>)}
            </div>
        </div>
    </div>
}
