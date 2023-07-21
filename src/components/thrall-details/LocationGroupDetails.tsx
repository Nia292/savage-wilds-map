import {MapLocationGroup, LocationGroupType} from "../../model/MapLocationGroup";
import React from "react";
import './LocationGroupDetails.css';
import {LocationGroupHeader} from "../location-group-header/LocationGroupHeader";
import {ThrallDetailsLocations} from "./location-group-details-locations/ThrallDetailsLocations";
import {MapLocation} from "../../model/MapLocation";
import {HoveredThrallLocation} from "../../model/HoveredThrallLocation";

interface LocationGroupDetailsProps {
    focused: boolean;
    locationGroup?: MapLocationGroup;
    // Hovered thrall location for highlighting
    hoveredLocation?: HoveredThrallLocation;
    onDeSelect(): void;
    onSelectLocation(location: MapLocation): void;
}

export const LocationGroupDetails = (props: LocationGroupDetailsProps) => {
    const slideAnimationClass = props.focused ? 'thrall-details-sliding-in' : 'thrall-details-sliding-out'
    return <div className={"thrall-details-container " + slideAnimationClass}>
        <div className="thrall-details">
            <LocationGroupHeader group={props.locationGroup || {locations: [],name: '',type: LocationGroupType.BOSS, id: 'ada', funcomId: ''}}
                                 icon={"chevron_left"}
                                 onSelect={props.onDeSelect}/>
            <div className="thrall-location-description">
                {props.locationGroup?.locationDescription}
            </div>
            <ThrallDetailsLocations hoveredLocation={props.hoveredLocation} thrall={props.locationGroup} onSelectLocation={props.onSelectLocation}/>
        </div>
    </div>
}
