import React, { useState, useEffect } from 'react';
import waitingGif from './waiting.gif';
import './App.css';

import PackageExplorer from './PackageExplorer';
import serializePackageJson from './serializePackageJson';

function App() {

  const [ complexPackage, setComplexPackage ] = useState( null );
  const [ isResolved, setIsResolved ] = useState( false );
  
  useEffect(
    ()=> {
      setTimeout(()=>
        fetch('/complex-package.json', {
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response=> response.json())
          .then(setComplexPackage), 300); // just to show the waiting gif
    }, []);
  
  return (
    <div className='App'>
      <header className='App-header'>
        { !complexPackage ? (
            <img src={waitingGif} alt='waiting' className='App-waiting' />
        ) : (
            <PackageExplorer pack={
              isResolved ? ({
                name: complexPackage.name,
                version: complexPackage.version,
                dependencies: serializePackageJson(complexPackage)
              }) : (
                complexPackage
              )
            } />
        )}
      </header>
      <button onClick={()=> setIsResolved(!isResolved)}>Toggle</button>
    </div>
  );
}

export default App;
