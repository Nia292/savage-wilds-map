import React from "react";
import {MapLocationGroup} from "../../model/MapLocationGroup";
import './LocationGroupHeader.css'


export interface LocationGroupHeaderProps {
    thrall: MapLocationGroup;
    icon: 'chevron_right' | 'chevron_left';
    onSelect(thrall: MapLocationGroup): void;
}

export const LocationGroupHeader = (props: LocationGroupHeaderProps) => {
    return <div className="location-group-header" onClick={() => props.onSelect(props.thrall)}>
        <div>
            <div className="location-group-header-name">{props.thrall.name}</div>
            <div className="location-group-header-type">
                {props.thrall.type}
            </div>
            <div className="location-group-header-type">
                {props.thrall.funcomId}
            </div>
        </div>
        <div style={{marginLeft: 'auto', marginRight: '16px'}}>
            <span className="material-icons" style={{fontSize: '20pt'}}>{props.icon}</span>
        </div>
    </div>
}
