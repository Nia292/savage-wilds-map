import React from 'react';
import './css/variables.css'
import './css/dialog.css'
import {SavageWildsMap} from "./components/SavageWildsMap";
import {MapLocationGroup} from "./model/MapLocationGroup";


interface MapData {
    "map_lq": string;
    "map_hq": string;
    minZoom: number;
    maxZoom: number;
    data: MapLocationGroup[];
    contributors?: string[];
    bounds: {
        south: number,
        west: number,
        north: number,
        east: number
    },
}

interface AppState {
    data: MapData;
    loaded: boolean;
}


function determineDataUrl(): string {
    return process.env.PUBLIC_URL + '/data.json';
}

function minZoom(): number {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('minZoom');
    if (param) {
        const res = Number.parseFloat(param);
        if (res) {
            return res;
        } else {
            console.error("Failed to parse minZoom as float, falling back to default")
        }

    }
    return 0.00126984127 * (window.innerWidth - 425) - 10.928;
}

export class App extends React.Component<any, AppState> {


    constructor(props: any) {
        super(props);
        this.state = {
            loaded: false,
            data: {
                data: [],
                map_hq: '',
                map_lq: '',
                minZoom: -12,
                maxZoom: -4,
                bounds: {
                    east: 0,
                    north: 0,
                    south: 0,
                    west: 0
                },
            }
        }
    }

    componentDidMount() {
        fetch(determineDataUrl())
            .then(value => value.json())
            .then(data => this.setState({data, loaded: true}))
    }

    render() {

        if (!this.state.loaded) {
            return <div>Map Loading...</div>
        }
        const bounds = this.state.data.bounds;
        return (
            <div>
                <SavageWildsMap data={this.state.data.data}
                                minZoom={minZoom()}
                                maxZoom={this.state.data.maxZoom}
                                mapHq={this.state.data.map_hq}
                                mapLq={this.state.data.map_lq}
                                north={bounds.north}
                                west={bounds.west}
                                east={bounds.east}
                                south={bounds.south}
                                contributors={this.state.data.contributors || []}
                />
            </div>
        );
    }
}

export default App;
