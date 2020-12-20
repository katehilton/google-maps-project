import { connect } from 'react-redux';
import { addLocation } from '../actions';

function AddButton({location, locations, addLocation}) {
    return (
        <div style={{display: 'flex', flex: 1, margin: '5px'}}>
            <button 
                style={{display: 'flex', flex: 1, justifyContent: 'center', fontSize: '14pt', alignItems: 'center'}} 
                className="btn waves-effect waves-light" 
                name="search"
                onClick={() => addLocation(location, locations)}
            >
                <i className="fas fa-plus"></i>
            </button>
        </div>
    );
}

const mapStateToProps = ({map}) => {
    let { locations } = map;
    return {locations}
 }

const mapDispatchToProps = {
    addLocation
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddButton);