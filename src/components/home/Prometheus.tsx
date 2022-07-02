import React from 'react';

export default function Prometheus() {
    return (
        <div>
            <iframe 
                width='900px'
                height='900px'
                src='http://127.0.0.1:9090'
            />
                <iframe 
                width='900px'
                height='900px'
                name={"disable-x-frame-options"}
                src='http://127.0.0.1:3000'
            />
        </div>
    )
}