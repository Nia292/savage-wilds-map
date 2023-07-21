import React from "react";
import {MapLocationGroup} from "../../model/MapLocationGroup";
import './LocationGroupHeader.css'
import {SWMapCheckbox} from "../../shared-components/SWMapCheckbox";


export interface LocationGroupHeaderProps {
    group: MapLocationGroup;
    visible?: boolean;
    icon: 'chevron_right' | 'chevron_left';
    onSelect(group: MapLocationGroup): void;
    onSetVisible?(group: MapLocationGroup, visible: boolean): void;
}

export const LocationGroupHeader = (props: LocationGroupHeaderProps) => {
    let classes = "location-group-header";
    // Not set => always visible
    const visible = props.visible === undefined ? true : props.visible;
    if (!visible) {
        classes += ` location-group-header-disabled`;
    }
    return <div className={classes}>
        {props.onSetVisible && <div className="location-group-header-toggle">
            <SWMapCheckbox checked={visible} checkedChange={checked => props.onSetVisible && props.onSetVisible(props.group, checked)}/>
        </div>}
        <div className="location-group-header-name" onClick={() => props.onSelect(props.group)}>{props.group.name}</div>
        <div onClick={() => props.onSelect(props.group)} style={{marginLeft: 'auto', marginRight: '16px'}}>
            <span className="material-icons" style={{fontSize: '20pt'}}>{props.icon}</span>
        </div>
    </div>
}
