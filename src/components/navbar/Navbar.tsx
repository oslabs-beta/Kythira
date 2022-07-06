import React from 'react';

interface NavbarProps {
  updatePage: (targetPage:string) => void
}
//Programmatically generates a list of buttons (defined in the pages array), which will update the component (or 'page') rendered on the HomeDisplay when clicked
export default function Navbar (props:NavbarProps) {
  const { updatePage } = props;
  const pages = ['Structure','Create Deployment','Manage Deployments','Prometheus','Grafana','Metrics','Logs'];
  const options = [];
  for (let i = 0; i < pages.length; i++) {
    options.push(<button className='navbarBtn' key={pages[i]} onClick={() => updatePage(pages[i])}>{pages[i]}</button>);
  }
  return (
    <div id='navBar'>
      {options}
    </div>
  );
}