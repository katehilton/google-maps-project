import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveDetails } from '../actions';
import SaveButton from './SaveButton';

function LocationDetails({saveDetails, lKey, selectLocation}) {
    const [name, setName] = useState(selectLocation.name);
    const [type, setType] = useState(selectLocation.type);
    const [phone, setPhone] = useState(selectLocation.phone);
    const [email, setEmail] = useState(selectLocation.email);

    useEffect(()=>{
        setName(selectLocation.name);
        setType(selectLocation.type);
        setPhone(selectLocation.phone);
        setEmail(selectLocation.email);
    }, [selectLocation])

    let details = {...selectLocation, name, type, phone, email};
    return (
        <div className="card" style={styles.cardOver}>
            <span className="card-title">Location Details</span>
            <div style={styles.container}>
                <label style={styles.label}>Name:</label>
                <input style={styles.input} type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div style={styles.container}>
                <label style={styles.label} >Type:</label>
                <input style={styles.input} type="text" id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}></input>
            </div>
            <div style={styles.container}>
                <label style={styles.label}>Phone:</label>
                <input style={styles.input} type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
            </div>
            <div style={styles.container}>
                <label style={styles.label}>Email:</label>
                <input style={styles.input} type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <SaveButton saveDetails={() => saveDetails(lKey, details)}/>
        </div>
    );
    
}

const styles = {
    cardOver:{
        padding: '5px'
    },
    container: {
        display: 'flex', 
        flex: 1,
        flexDirection: 'row', 
        height: '40px',
    },
    label: {
        flex: 2,
        fontSize: '12pt',
        lineHeight: '40px'
    },
    input: {
        flex: 11,
        fontSize: '10pt',
        border: 'none',
        height: '40px'        
    }
}

const mapStateToProps = ({map}) => {
    let { selectLocation, lKey } = map;
    return { selectLocation, lKey }
 }

 const mapDispatchToProps = {
   saveDetails
 }

 export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LocationDetails);