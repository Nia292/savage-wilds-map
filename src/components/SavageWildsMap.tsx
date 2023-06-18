import {ImageOverlay, MapContainer, ZoomControl} from "react-leaflet";
import {CRS, LatLngLiteral,} from "leaflet";
import {LocationGroupList} from "./LocationGroupList/LocationGroupList";
import {MapLocationGroup} from "../model/MapLocationGroup";
import React, {ChangeEvent, useState} from "react";
import {calculateBounds, ceCoordinateToLatLng, findCenter} from "../util/conversions";
import {MapLocation} from "../model/MapLocation";
import {ZoomCenter} from "../model/ZoomCenter";
import {SetViewOnClick} from "./thrall-map-utils/SetViewOnClick";
import {MarkerForSelectedThrall} from "./thrall-map-utils/MarkerForSelectedThrall";
import {MapEvents} from "./thrall-map-utils/MapEvents";
import {InfoDialog} from "./info-dialog/InfoDialog";
import {SettingsDialog} from "./settings-dialog/SettingsDialog";
import {MarkerForAllLocationGroups} from "./thrall-map-utils/MarkerForAllLocationGroups";
import {HoveredThrallLocation} from "../model/HoveredThrallLocation";

const DEFAULT_ZOOM = -8.7;
const DEFAULT_CENTER: LatLngLiteral = {lat: 0, lng: 0};

// Coordiantes are [y,x]
// Teleport player locates them as [x, y, z]

// Left Side: TeleportPlayer -342934.09375 349993.78125 -17373.080078
// Right side: TeleportPlayer 474806.09375 329969.6875 -37927.75
// Bottom: TeleportPlayer 248194.171875 368872.59375 -10562.074219
// Top: TeleportPlayer 17492.65625 -445384.28125 15668.111328

// WEST SOUTH EAST NORTH
// -342934 368872 474806 -445384
// Latitude: bottom to top
// Longitude: left to right
// Left/West: -342934.00000
// Right: 474806.00000
// Top: -445384.00000
// Bottom: 368872.00000
// const southWest: LatLng = new LatLng(368872.00000, -342934.00000);

interface SavageWildsMapProps {
    data: MapLocationGroup[];
    mapLq: string;
    mapHq: string;
    north: number;
    south: number;
    west: number;
    east: number;
    minZoom: number;
    maxZoom: number;
    contributors: string[];
}



export function SavageWildsMap(props: SavageWildsMapProps) {
    const [selectedThrall, setSelectedThrall] = useState(undefined as unknown as MapLocationGroup | undefined);
    // Use a separate focus flag to control whether the detail display or the list display is used
    // This avoids having an undefined name while the element with the details is sliding out
    const [thrallFocused, setThrallFocused] = useState(false);
    const [zoomCenter, setZoomCenter] = useState(undefined as unknown as ZoomCenter | undefined);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
    const [useHq, setUseHq] = useState(false);
    const [offset, setOffset] = useState({
        offsetTop: 0,
        offsetBot: 0,
        offsetLeft: 0,
        offsetRight: 0
    });
    const [hoveredLocation, setHoveredLocation] = useState(undefined as unknown as (HoveredThrallLocation | undefined));

    function handleSelectThrall(thrall: MapLocationGroup) {
        let center = findCenter(thrall.locations);
        if (center) {
            setZoomCenter({zoom: -8, center});
        }
        setSelectedThrall(thrall)
        setThrallFocused(true)
    }

    function handleDeselectThrall() {
        // While animating, we still want the thrall details visible until
        // it has slide out.
        setThrallFocused(false)
        setZoomCenter({zoom: -8.7, center: DEFAULT_CENTER});
    }

    function handleSelectLocation(location: MapLocation): void {
        setZoomCenter({
            center: ceCoordinateToLatLng(location),
            zoom: -7,
        });
    }

    function handleHqClick(event: ChangeEvent<HTMLInputElement>) {
        let target = event.target as HTMLInputElement;
        setUseHq(target.checked)
    }

    // const handleClickThrall = (id: string): void => {
    //     const thrall = props.data.find(value => value.id === id);
    //     if (thrall) {
    //         handleSelectThrall(thrall);
    //     }
    // }

    const center = zoomCenter?.center ? zoomCenter.center : DEFAULT_CENTER;
    const zoom = zoomCenter?.zoom ? zoomCenter.zoom : DEFAULT_ZOOM
    const mapBounds = calculateBounds(props.south, props.west, props.north, props.east, offset);
    return <div className="thrall-map-wrapper">
        <div id="info-button" className={"display-in-center"} onClick={() => setInfoDialogOpen(true)}>
            <span className="material-icons" style={{fontSize: '18pt'}}>
                help_outline
            </span>
        </div>
        <div id="settings-button" className={"display-in-center"} onClick={() => setSettingsDialogOpen(true)}>
            <span className="material-icons" style={{fontSize: '18pt'}}>
                settings
            </span>
        </div>
        <div id="hq-checkbox-wrapper" className="display-in-center">
            <input id="hq-checkbox" type="checkbox" checked={useHq} onChange={handleHqClick}/>
            <label htmlFor="hq-checkbox">HQ Map (6MB)</label>
        </div>
        <InfoDialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)} contributors={props.contributors}/>
        <SettingsDialog open={settingsDialogOpen}
                        offset={offset}
                        onOffsetChange={setOffset}
                        onClose={() => setSettingsDialogOpen(false)}/>
        <MapContainer center={center}
                      style={{height: '100vh', width: 'calc(100vw - var(--sidebar-width))'}}
                      minZoom={props.minZoom}
                      maxZoom={props.maxZoom}
                      zoomSnap={0.1}
                      zoomDelta={0.1}
                      crs={CRS.Simple}
                      bounds={mapBounds}
                      maxBounds={mapBounds}
                      zoomControl={false}
                      zoom={zoom}
        >
            <ZoomControl/>
            {!useHq && <ImageOverlay url={process.env.PUBLIC_URL + props.mapLq} bounds={mapBounds} />}
            {useHq && <ImageOverlay url={process.env.PUBLIC_URL + props.mapHq} bounds={mapBounds}/>}
            <MapEvents mapBounds={mapBounds} onZoomCenterChange={setZoomCenter}/>
            <SetViewOnClick location={zoomCenter}/>
            <MarkerForSelectedThrall thrall={selectedThrall} focused={thrallFocused} onHoveredChange={setHoveredLocation}/>
            <MarkerForAllLocationGroups thralls={props.data} focused={thrallFocused}/>
        </MapContainer>
        <div className="sidebar-right">
            <LocationGroupList groups={props.data}
                               onSelectLocation={handleSelectLocation}
                               selectedGroupFocused={thrallFocused}
                               selectedGroup={selectedThrall}
                               hoveredLocation={hoveredLocation}
                               onDeselectThrall={handleDeselectThrall}
                               onSelectThrall={handleSelectThrall}/>
        </div>
    </div>
}
