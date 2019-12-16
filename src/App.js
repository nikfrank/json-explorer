import React, { useState, useEffect } from 'react';
import waitingGif from './waiting.gif';
import './App.css';

import PackageExplorer from './PackageExplorer';

function App() {

  const [ complexPackage, setComplexPackage ] = useState(null);

  useEffect(
    ()=> {
      setTimeout(()=>
        fetch('/complex-package.json', {
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response=> response.json())
          .then(setComplexPackage), 300); // just to show the waiting gif
    }, []);

  console.log(complexPackage);
  
  return (
    <div className="App">
    <header className="App-header">
    { !complexPackage ? (
      <img src={waitingGif} alt='waiting' className='App-waiting' />
    ) : (
      <>
        <PackageExplorer pack={complexPackage} />
      </>
    )}
      </header>
    </div>
  );
}

export default App;
