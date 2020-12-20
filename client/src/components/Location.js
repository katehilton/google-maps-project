import { connect } from 'react-redux';
import { setLocation } from '../actions';

function Location({setLocation, selectLocation, lKey, location}) {
    if (location && selectLocation){
        let selectAddress = selectLocation.location.location.formatted_address;
        let address = location.location.location.formatted_address;
        if (selectAddress == address){
            return (
                <li className="teal collection-item teal white-text">
                    {location.name}
                </li>
            );
        }
    }

    return (
        <li 
            className="collection-item " 
            onClick={()=>{
                setLocation(lKey, location)
            }}
            >
                {location.name}
            </li>
    );
}

const mapStateToProps = ({map}) => {
    let { selectLocation } = map;
    return {
        selectLocation
  }
 }
 
 const mapDispatchToProps = {
    setLocation
 }

 export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Location);