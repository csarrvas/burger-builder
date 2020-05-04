import React from 'react';
import './css/header.css';
import PropTypes from 'prop-types';

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

Header.propTypes = {
  change: PropTypes.func.isRequired
}

export default Header;