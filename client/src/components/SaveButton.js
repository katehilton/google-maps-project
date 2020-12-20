export default function SaveButton({saveDetails}) {
    return (
        <div style={{display: 'flex', flex: 1, margin: '5px'}}>
            <button 
                style={{display: 'flex', flex: 1, justifyContent: 'center', fontSize: '14pt', alignItems: 'center'}} 
                className="btn waves-effect waves-light" 
                name="save"
                onClick={saveDetails}
            >
                Save Details
                <i style={{marginLeft: '20px', fontSize: '16pt'}} className="far fa-save"></i>
            </button>
        </div>
        
    );
}