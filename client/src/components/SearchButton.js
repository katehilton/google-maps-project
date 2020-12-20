export default function SearchButton({searchLocation}) {
    return (
        <div style={{display: 'flex', flex: 1, margin: '5px'}}>
            <button 
                style={{display: 'flex', flex: 1, justifyContent: 'center', fontSize: '14pt', alignItems: 'center'}} 
                className="btn waves-effect waves-light" 
                name="search"
                onClick={searchLocation}
            >
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
}