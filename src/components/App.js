import React, { Component, Fragment } from 'react';
import Header from './Header';
import Burger from './Burger';
import ListKrabbyPatty from './ListKrabbyPatty';
import GalleyGrub from './GalleyGrub';
import Footer from './Footer';
import { LocalStorage } from '../helpers/localStorage';
import './css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.ls = new LocalStorage();
    this.state = { opt: '' }
  }

  changeOption = opt => this.setState({ opt: opt });

  optionSelected(opt) {
    switch(opt) {
      case 'create':
        return <Burger ls={this.ls} />;
      case 'myList':
        return <ListKrabbyPatty ls={this.ls} />;
      case 'apiList':
        return <GalleyGrub ls={this.ls} />;
      default:
        return (
          <Fragment>
            <figure id="mr-krabs">
              <img  alt="mr krabs" src="/images/mr-krabs.png"/>
            </figure>
            <p id="welcome">Welcome to <span>The Krusty Krab!</span></p>
          </Fragment>
        );
    }
  }

  render() { 
    return (
      <Fragment>
        <Header change={this.changeOption} />
        <main>
          {this.optionSelected(this.state.opt)}
        </main>
        <Footer/>
      </Fragment>
    );
  }
}
 
export default App;