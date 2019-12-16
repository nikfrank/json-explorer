const compareVersions = (aString, bString)=> {
  const a = aString.replace('^', '').split('.');
  const b = bString.replace('^', '').split('.');
  
  for(let i=0; i<a.length; i++){
    if( 1*a[i] < 1*b[i] ) return -1;
    if( 1*a[i] > 1*b[i] ) return 1;
  }
  return 0;
}


const flattenPackDeps = deps=>
  Object.keys(deps)
        .map(dep =>
          [
            dep,
            typeof deps[dep] === 'string'? (
              deps[dep]
            ) : (
              deps[dep].version
            ),
            deps[dep].dependencies,
          ]);

export default pack=> {
  const resolved = {};

  const depQueue = flattenPackDeps(pack.dependencies);
  
  // loop through keys
  // stack dependencies in next level loop (json)

  // if not in resolved, put there
  // if lower version, skip
  // if higher version, replace

  while( depQueue.length ){
    const [nextDep, nextVersion, nestedDep] = depQueue.shift();
    
    if( !resolved[nextDep] ){
      resolved[nextDep] = nextVersion;
    }

    if(nestedDep) depQueue.push(...flattenPackDeps(nestedDep));
  }
  
  return resolved;
};
