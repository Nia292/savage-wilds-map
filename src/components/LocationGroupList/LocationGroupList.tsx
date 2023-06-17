import {MapLocationGroup} from "../../model/MapLocationGroup";
import {LocationGroupListItem} from "./LocationGroupListItem";
import React from "react";
import {LocationGroupDetails} from "../thrall-details/LocationGroupDetails";
import './LocationGroupList.css';
import {MapLocation} from "../../model/MapLocation";
import {HoveredThrallLocation} from "../../model/HoveredThrallLocation";

export interface LocationGroupListProps {
    selectedGroup?: MapLocationGroup;
    // For animation
    selectedGroupFocused: boolean;
    groups: MapLocationGroup[];
    // For marking the thrall that is hovered in the map
    hoveredLocation?: HoveredThrallLocation;

    onSelectThrall(thrall: MapLocationGroup): void;
    onDeselectThrall(): void;
    onSelectLocation(location: MapLocation): void;
}

export const LocationGroupList = (props: LocationGroupListProps) => {
    const additionalListClass = props.selectedGroupFocused ? 'thrall-list-sliding-out' : 'thrall-list-sliding-in';
    return <React.Fragment>
        <LocationGroupDetails focused={props.selectedGroupFocused}
                              onSelectLocation={props.onSelectLocation}
                              hoveredLocation={props.hoveredLocation}
                              locationGroup={props.selectedGroup}
                              onDeSelect={props.onDeselectThrall}/>
        <div className={'thrall-list ' + additionalListClass}>
            {props.groups
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(value => <LocationGroupListItem key={value.id}
                                                     onSelect={props.onSelectThrall}
                                                     thrall={value}/>)}
        </div>
    </React.Fragment>
}
