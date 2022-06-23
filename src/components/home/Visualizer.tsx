import React, {useEffect}  from 'react';
import d3tree from '../d3tree';

interface VisualizerProps {
    namespace: any
}

export default function Visualizer(props: VisualizerProps) {
    useEffect(()=>{
        if (props.namespace) d3tree(props.namespace);
      },[props.namespace]);
    return (
        <div data-testid='tempID' className='gridTree'>
            {props.namespace !== false && <div id='d3treeWrapper'></div>}
            {props.namespace === undefined && <div>Please select a namespace to visualize</div>}
        </div>
    )
}