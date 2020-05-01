import React from 'react';
import './css/header.css';

const Header = ({ change }) => {
  return (
    <header>
      <img alt="krusty krab logo" src="images/krusty-krab-logo.png"/>
      <nav>
        <ul>
          <li><button onClick={() => change('create')}>Create my krabby patty</button></li>
          <li><button onClick={() => change('myList')}>Look a krabby patty</button></li>
          <li><button onClick={() => change('apiList')}>Galley Grub</button></li>
        </ul>
      </nav>
    </header>
  );
}
 
export default Header;