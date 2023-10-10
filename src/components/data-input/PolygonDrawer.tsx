import React, {useEffect, useState} from "react";
import {Polygon, Tooltip, useMapEvents} from "react-leaflet";
import {LatLng} from "leaflet";
import './PolygonDrawer.css'
import {nanoid} from "nanoid";
import {latLngToCeCoordinate} from "../../util/conversions";


export const PolygonDrawer = () => {
    const [polygonPoints, setPolygonPoints] = useState([] as LatLng[]);
    const [isOpen, setIsOpen] = useState(false);
    const [color] = useState('purple');
    useMapEvents({
        click: event => {
            if (isOpen) {
                const newPoints = [...polygonPoints, event.latlng];
                setPolygonPoints(newPoints);
            }

        },
    });

    const polyPointsCe = polygonPoints.map(poly => latLngToCeCoordinate(poly));

    const jsonPolygon = JSON.stringify({
        color: color,
        id: nanoid(10),
        points: polyPointsCe,
        tooltip: 'here be dragons'
    }, null, 2);


    useEffect(() => {
       document.body.addEventListener('keypress', keyEvent => {
           if (keyEvent.key === 'R' && keyEvent.shiftKey) {
               if (isOpen) {
                   setPolygonPoints([]);
               }
               setIsOpen(!isOpen)
           }
           if (keyEvent.key === 'D' && keyEvent.shiftKey) {
               if (isOpen) {
                   navigator.clipboard.writeText(jsonPolygon);
               }
           }
       })
    }, [jsonPolygon, isOpen]);

    if (!isOpen) {
        return <></>
    }


    return <div>
        <Polygon pathOptions={{ color: color }} positions={polygonPoints}>
            <Tooltip direction="bottom">Here be dragons</Tooltip>
        </Polygon>
        <div id="poly-drawer-bottom">
            <h3>Current Polygon</h3>
            <textarea rows={30} value={jsonPolygon} disabled={true}></textarea>
            <div>Shift + R = close + reset</div>
            <div>Shift + D = copy to keyboard</div>
        </div>

    </div>
}