import React from 'react';

import {Home} from '../src/pages/home';

function App() {
  return (
    <div 
    className="App" style={{backgroundColor: '#1c124b', position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0'}}>
    <Home/>
      {/* вынести стили */}
  
    </div>
  );
}

export default App;
