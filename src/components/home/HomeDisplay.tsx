import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Visualizer from './Visualizer';
import Navigator from './Navigator';

export default function HomeDisplay() {

    // This is going to be the full JSON structure of the namespace we want to visualize
    const [namespace, setNamespace] = useState<any>();

    // This is going to take the namespace of the component it was clicked in 
    // fetch the structure of that namespace
    // then assign that structure as the current namespace in state
    const updateNamespace = (targetNamespace:string) => {
    //   console.log('targetNamespace is ', targetNamespace)
    //   setNamespace(testData)
      const reqBody = {
        namespace: targetNamespace
      }

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

    return (
      <main className='verticalFlex'>
        <img src='https://i.kym-cdn.com/entries/icons/facebook/000/034/256/Welcome_to_downtown_coolsville_banner.jpg' width='400px' height='225px'/>
        <h2>We're glad you could made it 😎</h2>
        <section className='horizontalFlex'>
          <Navigator updateNamespace={updateNamespace}/>
          <Visualizer namespace={namespace} />
        </section>
        <Link to="/main_window">Back to the log in page</Link>
        <Link to="/signup">Back to the sign up page</Link>
        <Link to="/forgotPassword">Back to the forgot password page</Link>
      </main>
    );
  }