import React, {useState} from 'react';

interface NavigatorProps {
    updateNamespace: (targetNamespace:string) => void
}

export default function Navigator(props: NavigatorProps){

    const [namespaces, setNamespaces] = useState([]);

    const getNamespaces = () => {
        console.log('Entered the getNamespaces request')

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
            .catch(err => console.log('getNamespaces ERROR: ', err))
    }

        const namespaceGroup = namespaces.map((elem, index) => {
        // if(namespace.name !== || namespace.name !== || namespace.name !==)
        return (
            <div className='horizontalFlex' key={`${elem} ${index}`}>
                <div>Namespace: {elem}</div>
                <button onClick={() => {props.updateNamespace(elem)}}>Visualize Me</button>
            </div>
        )
    })
    
    return (
        <div>
            <span>Active namespaces below</span><button onClick={getNamespaces}>Refresh namespaces</button>
            <div className='grid'>
            {namespaceGroup}
            </div>
        </div>

    )
}