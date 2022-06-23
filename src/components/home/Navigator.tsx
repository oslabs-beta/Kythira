import React, {useState} from 'react';

interface NavigatorProps {
    updateNamespace: (targetNamespace:string) => void
}

export default function Navigator(props: NavigatorProps){

    const [namespaces, setNamespaces] = useState([{namespace: 'test'}, {namespace: 'test2'}, {namespace: 'test3'}]);

    const getNamespaces = () => {
        fetch('http://localhost:8080/k8/namespaces', {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Namespaces from backend', data);
                setNamespaces(data);
            })
            .catch(err => console.log('verifyLogin ERROR: ', err))
    }

    const namespaceGroup = namespaces.map((elem) => {
        // if(namespace.name !== || namespace.name !== || namespace.name !==)
        return (
            <div className='horizontalFlex'>
                <div>Pod {elem.namespace}</div>
                <button onClick={() => {props.updateNamespace(elem.namespace)}}>Visualize Me</button>
            </div>
        )
    })
    
    return (
        <div>
            <span>Active pods below</span><button onClick={getNamespaces}>Click me to refresh pods</button>
            <div className='grid'>
            {namespaceGroup}
            </div>
        </div>

    )
}