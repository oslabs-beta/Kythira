import React from 'react';

// Renders the Grafana homepage within an iframe
export default function Grafana() {
  return (
    <div>
      <iframe 
        width='900px'
        height='900px'
        name={'disable-x-frame-options'}
        src='http://127.0.0.1:3000'
      />
    </div>
  );
}