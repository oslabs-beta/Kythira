import React, {useEffect}  from 'react';
import d3tree from '../d3tree';

interface VisualizerProps {
    namespace: any
}

//Visualizer accepts a namespaces structure and creates a D3 visual from it
export default function Visualizer(props: VisualizerProps) {

  // Invokes the d3tree function (which visualizes the current namespace) whenever there is a change in the components props
  useEffect(()=>{
    if (props.namespace) d3tree(props.namespace);
  },[props.namespace]);

  return (
    <div data-testid='tempID' className='gridTree'>
      {props.namespace !== false && <div id='d3treeWrapper'></div>}
      {props.namespace === undefined && <div>Please select a namespace to visualize</div>}
    </div>
  );
}