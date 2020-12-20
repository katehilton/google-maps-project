import axios from 'axios';
import { fitBounds } from 'google-map-react';
import { 
    GET_PLACE, 
    ADD_LOCATION, 
    SET_LOCATION,
    SET_SEARCH, 
    GET_LOCATIONS,
    CLEAR_MESSAGE,
    SAVE_DETAILS,
    SET_MESSAGE
} from './types';
import database from '../components/firebase';

export const setSearch = (search) => {
    return function(dispatch){
        dispatch({
            type: SET_SEARCH,
            payload: {search}
        });
    }
}

export const getPlace = (search, size) => {
    return function(dispatch){
        if (search){
            axios.get('/api/search-place' + '?search=' + search)
            .then(res => {
                if (res.data.place){
                    let location = res.data.place;
                    let bounds = location.geometry.viewport;
                    bounds = {
                        ne:bounds.northeast,
                        sw:bounds.southwest
                    }
                    search = location.name +' - ' + location.formatted_address;
                    
                    if (location && size.height){
                        const {center, zoom} = fitBounds(bounds, size);
                        let loc = {center, zoom, location};
                        dispatch({
                            type: GET_PLACE,
                            payload: {location:loc, search}
                        });
                    }
                    else{
                        dispatch({
                            type: SET_MESSAGE,
                            payload: 'Something went wrong. Please try again!'
                        });
                    }
                }
                else{
                    dispatch({
                        type: SET_MESSAGE,
                        payload: res.data.error
                    });
                }
                
            })
        }
        else{
            dispatch({
                type: SET_MESSAGE,
                payload: 'Please enter a search.'
            });
        }
    }
}

export const addLocation = (location, locations) => {
    return function(dispatch){
        if (location.location){
            //check for dupes
            let dup = false;
            var keys = Object.keys(locations);
            
            keys.forEach(key => {
                let address  = locations[key].location.location.formatted_address;
                if (location.location.formatted_address == address){
                    dup = true;
                }
            });
            
            if (dup){
                dispatch({
                    type: SET_MESSAGE,
                    payload: "Duplicate addresses can't be added."
                });
            }
            else{
                let name = location.location.name || '';
                let type = location.location.types[0] || '';
                let phone = location.location.formatted_phone_number || '';
                let email = '';
                let savedLocation = {
                    name,
                    type,
                    phone,
                    email,
                    location
                }

                database.ref('/locations').push(savedLocation)
                .then(res => {
                    let key = res.key;
                    database.ref('/locations').once('value', function(snap){
                        let locations = snap.val();
                        dispatch({
                            type: ADD_LOCATION,
                            payload: {locations, lKey: key, location: savedLocation, message: 'Location added!'}
                        });
                    })
                })
            }

            

        }
        else{
            dispatch({
                type: SET_MESSAGE,
                payload: 'Start by searching a location to add.'
            });
        }
    }
}

export const getLocations = () => {
    return function(dispatch){
        database.ref('/locations').once('value', function(snap){
            let locations = snap.val();
            dispatch({
                type: GET_LOCATIONS,
                payload: {locations}
            });
        })
    }
}

export const saveDetails = (lKey, details) => {
    return function(dispatch){
        database.ref(`/locations/${lKey}`).set(details)
        .then(res => {
            database.ref('/locations').once('value', function(snap){
                let locations = snap.val();
                dispatch({
                    type: SAVE_DETAILS,
                    payload: {
                        locations, 
                        message: 'Details saved!',
                        search: details.name + ' - ' + details.location.location.formatted_address
                    }
                });
            })
        })
    }
}

export const setLocation = (lKey, selectLocation) => {
    return function(dispatch){
        dispatch({
            type: SET_LOCATION,
            payload: {
                location: selectLocation.location, 
                lKey, 
                selectLocation, 
                search: selectLocation.name + ' - ' + selectLocation.location.location.formatted_address
            }
        });
    }
}

export const clearMessage = () => {
    return function(dispatch){
        dispatch({
            type: CLEAR_MESSAGE
        });
    }
}

export const setMessage = (message) => {
    return function(dispatch){
        dispatch({
            type: SET_MESSAGE,
            message: message
        });
    }
}