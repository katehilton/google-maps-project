import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { getPlace } from '../actions';
import SearchBar from './SearchBar';
import Message from './Message';


const start = {
    center: {
        lat: 59.95,
        lng: 30.33
    },
    zoom: 11,
    name: 'where should we go today?'
};


function Map({ message, location, getPlace}) {
    const [map, setMap] = useState(null);
    const [maps, setMaps] = useState(null);
    
    const getLocation = (search) => {
        var myDiv = document.getElementById("map");
        let size;
        if (myDiv){
            size={
                height: myDiv.clientHeight,
                width : myDiv.clientWidth
            }
        }

        getPlace(search, size);
    } 

    return (
        <div id="map" style={{flex:3, position: 'relative'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDo0XcuRC4tsR_yl5HgmTJM_LwEoDizWBU'}}
                defaultCenter={start.center}
                defaultZoom={start.zoom}
                center={location.center}
                zoom={location.zoom}
                onGoogleApiLoaded={({ gmap, gmaps }) => {
                    setMap(gmap);
                    setMaps(gmaps);
                }}
                // onChange={renderMarkers}
                yesIWantToUseGoogleMapApiInternals
                
            >
                <div
                    lat={location.center.lat}
                    lng={location.center.lng}
                    text="My Marker"
                >
                    <i style={{fontSize: '30pt', color: 'magenta'}} className="fas fa-map-marker-alt"></i>
                </div>
            </GoogleMapReact>
            <div style={styles.message}><Message message={message}/></div>
            <div style={styles.search}>
                <SearchBar 
                    location={location}
                    searchLocation={getLocation}
                />
            </div>
        </div>
    );
}

const styles = {
    search: {
        position: 'absolute',
        bottom: 10,
        left: 110,
        zIndex: 2,
        width: '500px',
        backgroundColor: 'blue'
    },
    message: {
        position: 'absolute',
        top: 10,
        left: 90,
        zIndex: 2
    }
}

const mapStateToProps = ({map}) => {
    let { location, message } = map;
    return { location, message}
 }
 
 const mapDispatchToProps = {
   getPlace
 }

 export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Map);