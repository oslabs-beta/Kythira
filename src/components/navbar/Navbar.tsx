import React, { useState } from 'react';

interface NavbarProps {
  updatePage: (targetPage:string) => void
}

export default function Navbar (props:NavbarProps) {
  const { updatePage } = props;
  const pages = ['Structure','Create Deployment','Manage Deployments','Metrics','Logs'];
  const options = [];
  for (let i = 0; i < pages.length; i++) {
    options.push(<button className='navbarBtn' onClick={() => updatePage(pages[i])}>{pages[i]}</button>);
  }
  return (
    <div id='navBar'>
      {options}
    </div>
  )
};