import {MapLocationGroup} from "../../model/MapLocationGroup";
import React from "react";
import {LocationGroupHeader} from "../location-group-header/LocationGroupHeader";

export interface ThrallListThrallProps {
    group: MapLocationGroup;
    visible: boolean;

    onSelect(group: MapLocationGroup): void;
    onSetVisible(group: MapLocationGroup, visible: boolean): void;
}

export const LocationGroupListItem = (props: ThrallListThrallProps) => {
    return <LocationGroupHeader onSelect={props.onSelect} group={props.group} icon={"chevron_right"} visible={props.visible}
                                onSetVisible={props.onSetVisible}/>
}
