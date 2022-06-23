import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Visualizer from './Visualizer';
import Navigator from './Navigator';

const testData = {
  "name": "Namespace: default",
  "children": [
      {
          "name": "Node: minikube",
          "children": [
              {
                  "name": "Pod: 8r6j4",
                  "children": [
                      {
                          "name": "echoserver",
                          "image": "k8s.gcr.io/echoserver:1.4"
                      }
                  ]
              },
              {
                  "name": "Pod: 9hmvb",
                  "children": [
                      {
                          "name": "echoserver",
                          "image": "k8s.gcr.io/echoserver:1.4"
                      }
                  ]
              },
              {
                  "name": "Pod: mn7wc",
                  "children": [
                      {
                          "name": "echoserver",
                          "image": "k8s.gcr.io/echoserver:1.4"
                      }
                  ]
              },
              {
                  "name": "Pod: n28r2",
                  "children": [
                      {
                          "name": "echoserver",
                          "image": "k8s.gcr.io/echoserver:1.4"
                      }
                  ]
              }
          ]
      }
  ]
}


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
        <h2>Welcome to the homepage! We're glad you could made it 😊</h2>
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