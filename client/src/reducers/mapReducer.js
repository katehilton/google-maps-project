import * as types from '../actions/types';

const initialState = {
    location: {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11,
    },
    search: '',
    locations: {},
    selectLocation: null,
    message: '',
    lKey: ''
}

export default function reducer(state = initialState, action){
    var newState={...state};
    switch(action.type){
        case types.GET_PLACE:
            newState = {...newState,
                location: action.payload.location,
                search: action.payload.search,
                selectLocation: null
            }
            return newState;
        case types.SET_LOCATION:
            newState = {...newState,
                search: action.payload.search,
                selectLocation: action.payload.selectLocation,
                location: action.payload.location,
                lKey: action.payload.lKey
            }
            return newState;
        case types.GET_LOCATIONS:
            newState = {...newState,
                locations: action.payload.locations
            }
            return newState;
        case types.ADD_LOCATION:
            newState = {...newState,
                locations: action.payload.locations,
                selectLocation: action.payload.location,
                lKey: action.payload.lKey,
                message: action.payload.message
            }
            return newState;
        case types.SET_SEARCH:
            newState = {...newState,
                search: action.payload.search
            }
            return newState;
        case types.SAVE_DETAILS:
            newState = {...newState,
                locations: action.payload.locations,
                message: action.payload.message,
                search: action.payload.search
            }
            return newState;
        case types.CLEAR_MESSAGE:
            newState = {...newState,
                message: ''
            }
            return newState;
        case types.SET_MESSAGE:
            newState = {...newState,
                message: action.payload
            }
            return newState;
        default:
            return state;
    }
}