import React, {useState} from 'react';

export default function Navigator(){

    const [pods, setPods] = useState([]);

    const getPods = () => {
        fetch('http://localhost:8080/k8/pods', {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Pods from backend', data);
                setPods(data);
            })
            .catch(err => console.log('verifyLogin ERROR: ', err))
    }

    const podGroup = pods.map((elem) => {
        return (
            <div className='horizontalFlex'>
                <div>Pod {elem.podName}</div>
                <button>Visualize Me</button>
            </div>
        )
    })

    return (
        <div>
            <span>Active pods below</span><button onClick={getPods}>Click me to refresh pods</button>
            <div className='grid'>
            {podGroup}
            </div>
        </div>

    )
}