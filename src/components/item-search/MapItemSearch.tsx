import Autosuggest, {InputProps} from 'react-autosuggest';
import React, {useState} from 'react';
import './MapItemSearch.css';
import {MapLocationGroup} from "../../model/MapLocationGroup";
import {MapLocation} from "../../model/MapLocation";


interface MapItemSearchProps {
    locationGroups: MapLocationGroup[];

    locationSelect(location: MapLocation): void;
}


export const MapItemSearch = (props: MapItemSearchProps) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([] as MapLocation[]);

    const uniqueEnoughLocations = new Map<string, MapLocation>();
    props.locationGroups
        .map(value1 => value1.locations)
        .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
        .forEach(location => {
            if (!uniqueEnoughLocations.has(location.location || '')) {
                uniqueEnoughLocations.set(location.location || '', location);
            }
        })
    const locations = Array.from(uniqueEnoughLocations.values());

    const inputProps: InputProps<MapLocation> = {
        onChange: (event, params) => setValue(params.newValue),
        value,
        className: 'map-item-search-input',
        placeholder: 'Item Search'
    }

    function containsString(value = '', filterValue = ''): boolean {
        return value.toLowerCase().includes(filterValue.toLowerCase());
    }

    function filterSuggestions(filterValue: string) {
        const suggestions = locations.filter(item => containsString(item.location, filterValue) || containsString(item.spawnSpotDetail, filterValue));
        setSuggestions(suggestions.slice(0, 15));
    }

    function onSuggestionSelected(item: MapLocation) {
        props.locationSelect(item)
        setValue('')
    }

    return <Autosuggest suggestions={suggestions}
                        getSuggestionValue={suggestion => suggestion.location || ''}
                        inputProps={inputProps}
                        onSuggestionsFetchRequested={request => filterSuggestions(request.value)}
                        onSuggestionsClearRequested={() => setSuggestions([])}
                        onSuggestionSelected={(event, data) => onSuggestionSelected(data.suggestion)}
                        renderSuggestion={suggestion => <div className="single-suggestion">
                            <div className="single-suggestion-source">{suggestion.location}</div>
                            <div className="single-suggestion-source-detail">{suggestion.spawnSpotDetail}</div>
                        </div>}>
    </Autosuggest>
}
