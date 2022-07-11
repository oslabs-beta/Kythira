import React, {useState} from 'react';

interface NavigatorProps {
    updateNamespace: (targetNamespace:string) => void
}

export default function Navigator(props: NavigatorProps){

  const [namespaces, setNamespaces] = useState([]);

  // Retrieves all namespaces from k8 client API to use as options for visualization
  const getNamespaces = () => {
    fetch('http://localhost:8080/k8/namespaces', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/JSON'
      }
    })
      .then(response => response.json())
      .then(data => {
        setNamespaces(data);
      })
      .catch(err => console.log('getNamespaces ERROR: ', err));
  };

  // Generates JSX elements for all namespaces within state (fetched from k8 client API)
  const namespaceGroup = namespaces.map((elem, index) => {
    return (
      <div className='namespaceButton' >
        {elem} 
        <button onClick={() => {props.updateNamespace(elem);}}>Visualize Me</button>
      </div>
    );
  });
    
  return (
    <div id='namespaceWrapper'>
      <span>Active namespaces</span>
      <button onClick={getNamespaces}>Refresh namespaces</button>
      <div className='grid'>
        {namespaceGroup}
      </div>
    </div>
  );
}