import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Visualizer from './Visualizer';
import Navigator from './Navigator';
import Navbar from '../navbar/Navbar';
import NewDeployment from './NewDeployment';
export default function HomeDisplay() {

  // This is going to be the full JSON structure of the namespace we want to visualize
  const [namespace, setNamespace] = useState<any>();
  const [currentPage, setCurrentPage] = useState('Structure');
  // This is going to take the namespace of the component it was clicked in 
  // fetch the structure of that namespace
  // then assign that structure as the current namespace in state
  const updateNamespace = (targetNamespace:string) => {
  //   console.log('targetNamespace is ', targetNamespace)
  //   setNamespace(testData)
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
        console.log('Namespace from backend', data);
        setNamespace(data);
      })
    .catch(err => console.log('updateNamespace ERROR: ', err))
  }

  const updatePage = (clickedPage:string) => {
    setCurrentPage(clickedPage);
  };

  const ENUM_PAGE : any = {
    'Structure': <div id='namespacesWrapper'>
      <Navigator updateNamespace={updateNamespace}/>
      <Visualizer namespace={namespace} />
    </div>,
    'Create Deployment': <NewDeployment/>,
    'Manage Deployments': <div id='placeholder'>
      {/* Need to create new component that sends fetch request to k8 API for all active deployments/pods */}
        Manage Deployments
      </div>,
    'Metrics': <div id='placeholder'>
      {/* Need to create new component that shows graphs from Prometheus (generated from Grafana) */}
        Metrics
      </div>,

    'Logs': <section className='horizontalFlex'>
      {/* Need to create new component that shows a running list of logs from Prometheus and k8 API */}
      <div id='placeholder'>
        Logs
      </div>
    </section>
    
  };

  return (
    <main className='verticalFlex'>
      {/* <img src='https://i.kym-cdn.com/entries/icons/facebook/000/034/256/Welcome_to_downtown_coolsville_banner.jpg' width='400px' height='225px'/> */}
      {/* <h2>We're glad you could made it 😎</h2> */}
      <section className='horizontalFlex'>
        <Navbar updatePage={updatePage}/>
        {ENUM_PAGE[currentPage]}
      </section>
      {/* <Link to="/signup">Back to the sign up page</Link> */}
      {/* <Link to="/forgotPassword">Back to the forgot password page</Link> */}
      <Link to="/main_window">Log out</Link>
    </main>
  );
  }