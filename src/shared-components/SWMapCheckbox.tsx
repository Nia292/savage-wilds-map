import React from "react";
import './SWMapCheckbox.css'

export interface SWMapCheckboxProps {
    checked: boolean;
    checkedChange(checked: boolean): void;
}

export const SWMapCheckbox = (props: SWMapCheckboxProps) => {
    return <div className="sw-map-checkbox" onClick={() => props.checkedChange(!props.checked)}>
        {props.checked && <div className="sw-map-checkbox-checked"></div>}
        {!props.checked && <div className="sw-map-checkbox-default"></div>}
    </div>
}
