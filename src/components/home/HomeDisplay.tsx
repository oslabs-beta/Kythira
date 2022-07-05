import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Visualizer from './Visualizer';
import Navigator from './Navigator';
import Navbar from '../navbar/Navbar';
import NewDeployment from './NewDeployment';
import Prometheus from './Prometheus';
import Grafana from './Grafana';
export default function HomeDisplay() {

  // Full JSON structure of the namespace we want to visualize
  const [namespace, setNamespace] = useState<any>();
  
  const [currentPage, setCurrentPage] = useState('Structure');
  
  // Uses the namespace of the component it was clicked in to fetch the structure of that namespace
  // that structure is then assigned to state which forces a rerender of the visualizer component
  const updateNamespace = (targetNamespace:string) => {

    const reqBody = { namespace: targetNamespace };
    
    fetch('http://localhost:8080/k8/namespaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(reqBody)
    })
      .then(response => response.json())
      .then(data => {
        setNamespace(data);
      })
      .catch(err => console.log('updateNamespace ERROR: ', err));
  };

  // Function used to update state when a link in the navbar is clicked (to rerender the component on the home display) 
  const updatePage = (clickedPage:string) => {
    setCurrentPage(clickedPage);
  };

  // Enumerated object of JSX elements (when navbar 'clicked page' state is updated, the corresponding value associated with the state (as a key) is also updated)
  const ENUM_PAGE : any = {
    'Structure': <div id='namespacesWrapper'>
      <Navigator updateNamespace={updateNamespace}/>
      <Visualizer namespace={namespace} />
    </div>,
    'Create Deployment': <NewDeployment/>,
    //TODO: create component that renders list of active deployments 
    'Manage Deployments': <div id='placeholder'>Manage Deployments</div>,
    'Prometheus': <Prometheus/>,
    'Grafana': <Grafana/>,
    'Logs': <div id='placeholder'>
      {/* Need to create new component that shows a running list of logs from Prometheus and k8 API */}
        Logs
    </div>    
  };

  return (
    <main className='verticalFlex'>
      <section className='horizontalFlex'>
        <Navbar updatePage={updatePage}/>
        {ENUM_PAGE[currentPage]}
      </section>
      <Link to="/main_window">Log out</Link>
    </main>
  );
}