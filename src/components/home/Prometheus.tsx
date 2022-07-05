import React from 'react';

// Renders the Prometheus homepage within an iframe
export default function Prometheus() {
  return (
    <div>
      <iframe 
        width='900px'
        height='900px'
        src='http://127.0.0.1:9090'
      />
    </div>
  );
}