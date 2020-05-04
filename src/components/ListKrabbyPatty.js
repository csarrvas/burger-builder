import React, { Component } from 'react';
import Burger from './Burger';
import './css/listKrabbyPatty.css';
import PropTypes from 'prop-types';

class ListKrabbyPatty extends Component {
  constructor(props) {
    super(props);
    this.state = { id: null, name: '' }
  }

  changeName = name => this.setState({ name: name });

  deleteBurger = () => {
    this.props.ls.deleteBurger(this.state.id);
    document.getElementById('burgerSelector').value = '-1';
    this.setState({ id: null });
  }

  render() {
    const allBurgers = this.props.ls.getAllBurgers(); 
    return (
      <div id="burger-editor">
        <select id="burgerSelector" defaultValue="-1" onChange={e => this.setState({ id: parseInt(e.target.value) })}>
          <option value="-1" disabled>Select a Krabby Patty</option>
          {allBurgers.map((burger, index) => <option key={index} value={index}>{burger.name}</option>)}
        </select>
        {this.state.id !== null ? <Burger key={this.state.id} ls={this.props.ls} id={this.state.id} burger={allBurgers[this.state.id]} update={this.changeName} /> : null}
        {this.state.id !== null ? <button key={`Delete-${this.state.id}`} onClick={this.deleteBurger}>Delete the burger</button> : null}
      </div>
    );
  }
}

ListKrabbyPatty.propTypes = {
  ls: PropTypes.object.isRequired
}

export default ListKrabbyPatty;