import {MapLocationGroup} from "../../model/MapLocationGroup";
import React from "react";
import {LocationGroupHeader} from "../location-group-header/LocationGroupHeader";

export interface ThrallListThrallProps {
    thrall: MapLocationGroup;

    onSelect(thrall: MapLocationGroup): void;
}

export const LocationGroupListItem = (props: ThrallListThrallProps) => {
    return <LocationGroupHeader onSelect={props.onSelect} thrall={props.thrall} icon={"chevron_right"}/>
}
