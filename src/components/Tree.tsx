import React, {useEffect} from 'react';
import d3tree from './d3tree';

// interface

export default function Tree () {
  useEffect(()=>{
    d3tree();
  },[]);
  return(
    <div>
      <h6>Structure of Cluster</h6>
      <div id='wrapper'></div>
    </div>
  )
}

// interface Margins {
//   top: number,
//   bottom: number,
//   left: number,
//   right: number
// }
// interface Dms {
//   width: number,
//   height: number,
//   margins: Margins,
//   boundedWidth: number,
//   boundedHeight: number
// }