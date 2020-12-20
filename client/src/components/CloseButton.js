import { connect } from 'react-redux';
import { clearMessage } from '../actions';

function CloseButton({ clearMessage}) {
    return (
        <div style={{margin: '5px'}}>
            <button style={{justifyContent: 'center', fontSize: '14pt', alignItems: 'center'}} className="btn waves-effect waves-light" name="search">
                <i onClick={clearMessage} className="fas fa-times"></i>
            </button>
        </div>
    );
}

 const mapDispatchToProps = {clearMessage}

 export default connect(
    null,
    mapDispatchToProps
  )(CloseButton);