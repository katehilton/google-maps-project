import CloseButton from './CloseButton';

export default function Message({message}) {
    if (message){
        return (
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'relative', backgroundColor: 'white', width: '400px', right: '18%', bottom: '40%'}}>
                <div style={{marginLeft: '5px', fontSize: '12pt'}}>{message}</div>
                <CloseButton />
            </div>
        );
    }
    return null;
}