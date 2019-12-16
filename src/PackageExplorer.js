/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';

function ArrayExplorer({ array }) {
  return JSON.stringify(array);
}

function PackageExplorer({ pack, toggleSelf=(()=>0) }) {

  const [ deps, setDeps ] = useState([]);
  const [ openNests, setOpenNests ] = useState({});
  
  useEffect(()=> {
    setDeps( Object.keys(pack.dependencies || {}).sort() );
  }, [ pack ]);

  const toggle = dep=> setOpenNests({ ...openNests, [dep]: !openNests[dep] });
  
  return (
    <div className='PackageExplorer'>
      <span className='dep-key' onClick={toggleSelf}>
        {pack.name}: @{pack.version} ▼
      </span>
      <div className='pack-nest'>
        {
          deps.map(dep=> (
            <div key={dep} className='pack-nest'>
              <span onClick={()=> toggle(dep)}
                    className={typeof pack.dependencies[dep] !== 'object' ? '' : 'dep-key'}>
                {
                  typeof pack.dependencies[dep] !== 'object' ? (
                    <span className={'value-'+(typeof pack.dependencies[dep])}>
                      {dep}: {JSON.stringify(pack.dependencies[dep])}
                    </span>
                  ) :
                  !openNests[dep] ? dep + ': @'+pack.dependencies[dep].version+' ▶' : null
                }
              </span>
              {!openNests[dep] ? null : (
                 pack.dependencies[dep].constructor == Object ? (
                   <PackageExplorer pack={pack.dependencies[dep]} toggleSelf={()=> toggle(dep)}/>
                 ) : pack.dependencies[dep].constructor == Array ? (
                   <ArrayExplorer array={pack.dependencies[dep]} />
                 ) : null
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default PackageExplorer;
