import React, {useState} from 'react';

interface DeploymentObj {
  name: string,
  selectorLabels: Map<string,string>,
  numReplicas: number

}
// TODO: this component was designed to accept various inputs and create a new k8 deployment based on the inputs (as config options). The styling and fetch request/routing have yet to be completed 
export default function NewDeployment() {
  const [metadataName, setMetadataName] = useState('');
  const [specSelectorLabels, setSpecSelectorLabels] = useState('');
  const [numReplicas, setNumReplicas] = useState(0);
  const [templateSelectorLabels, setTemplateSelectorLabels] = useState('');
  const [containers, setContainers] = useState('');
  const createDeployment = () => {
    const specSelectorLabelMap = new Map();
    const specSelectorLabelArr = specSelectorLabels.replaceAll(' ','').split(',');
    specSelectorLabelArr.forEach(e => specSelectorLabelMap.set(e.slice(0,e.indexOf(':')),e.slice(e.indexOf(':') + 1)));

    const templateSelectorLabelMap = new Map();
    const templateSelectorLabelArr = templateSelectorLabels.replaceAll(' ','').split(',');
    specSelectorLabelArr.forEach(e => specSelectorLabelMap.set(e.slice(0,e.indexOf(':')),e.slice(e.indexOf(':') + 1)));


    const deploymentObj = {
      name: metadataName,
      numReplicas: numReplicas,
      selectorLabels: specSelectorLabelMap
    };
    fetch('/');
    return;
  };
  return (
    <div id='newDeployment'>
      <div className='newDeploymentInputField'>
        Deployment Name
        <input id='metadataName' type='text' placeholder='e.g., app' value={metadataName} onChange={(e) => setMetadataName(e.target.value)}/>
      </div>

      <div className='newDeploymentInputField'>
        Spec Selector Labels
        <input id='specSelectorLabels' type='text' placeholder='e.g., key1:value1, key2:value2, etc.' value={specSelectorLabels} onChange={(e) => setSpecSelectorLabels(e.target.value)}/>
      </div>

      <div className='newDeploymentInputField'>
        Number of Replicas
        <input id='numReplicas' type='text' placeholder='e.g., 1, 2, 3, ...' value={numReplicas} onChange={(e) => setNumReplicas(Number(e.target.value))}/>
      </div>

      <div className='newDeploymentInputField'>
        Template Selector Labels
        <input id='' type='text' placeholder='e.g., key1:value1, key2:value2, etc.'/>
      </div>

      <input id='' placeholder=''/>
      <input id='' placeholder=''/>
      <button onClick={createDeployment}></button>
    </div>
  );
}