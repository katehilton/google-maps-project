
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getLocations } from '../actions';
import Location from './Location';
import LocationDetails from './LocationDetails';

function Menu({selectLocation, lKey, location, locations, getLocations}) {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        getLocations();
        setLoaded(true);
      }, [])

    const renderLocations = () => {
        if (locations){
            let keys = Object.keys(locations);
            if (keys.length > 0) return keys.map(key => <Location id={key} lKey={key} location={locations[key]}/>)
        }
    }

    const renderDetails = () => {
        if (selectLocation){
           return  <LocationDetails lKey={lKey}/>
        }
    }

    return (
        <div style={{display: 'flex', flex:1,flexDirection: 'column', justifyContent: 'space-between'}}>
            <ul className="collection with-header">
                <li className="collection-header"><h4>Locations</h4></li>
                <div style={{ maxHeight: '350px', overflow: 'auto', flexDirection: 'column'}}>{renderLocations()}</div>
            </ul>
           {renderDetails()}
        </div>
    );
}

const mapStateToProps = ({map}) => {
    let { selectLocation, location, locations } = map;
    return {
        selectLocation,
        location,
        locations
  }
 }
 
 const mapDispatchToProps = {
    getLocations
 }

 export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Menu);