import Header from './Header';
import Map from './Map';
import Menu from './Menu';
// import * as actions from '../actions';


function App() {
  return (
    <div style={{display:'flex', flex: 1, flexDirection: 'column', minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden'}}>
      <Header />
      <div style={{display:'flex', flex: 1, flexDirection: 'row'}}>
        <Map />
        <Menu />
      </div>
    </div>
  );
}

export default App;
