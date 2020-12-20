import React from 'react';
import { connect } from 'react-redux';
import { setSearch } from '../actions';
import SearchButton from './SearchButton';
import AddButton from './AddButton';

function SearchBar({search, setSearch, location, searchLocation}) {
    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', position: 'relative', backgroundColor: 'white', width: '600px', right: '18%', top: '30%'}}>
            <input 
                type="text" 
                id="location" 
                name="location"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                value={search}
            />
            <SearchButton 
                searchLocation={() => {
                    searchLocation(search);
                }}
            />
            <AddButton 
                location={location}
            />
        </div>
    );
}

const mapStateToProps = ({map}) => {
    let { search } = map;
    return { search }
 }

const mapDispatchToProps = {
    setSearch
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);