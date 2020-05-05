import React, { Component } from 'react';
import Details from './Details';
import { availableIngredients } from '../helpers/ingredientsDetails';
import { printMessage } from '../helpers/ui';
import './css/burger.css';
import PropTypes from 'prop-types';

class Burger extends Component {
  constructor(props) {
    super(props);
    // this.state = this.props.burger ?  { ingredients: this.props.burger.ingredients } : { ingredients: [] };
    this.state = {
      ingredients: this.props.burger ? this.props.burger.ingredients : []
    };
  }

  addIngredient = (e) => {
    const newIngredient = e.target.value;

    if (availableIngredients.indexOf(newIngredient) !== -1) {
      // this.setState((state, prevState) => {
      //   const ingredients = [newIngredient, ...state.ingredients];
      //   return { ingredients };
      // });
      this.setState({
        ingredients: [newIngredient, ...this.state.ingredients]
      });
    }
  }

  removeIngredient = (e) => {
    const {ingredients} = this.state;
    const indexToRemove = this.state.ingredients.indexOf(e.target.value);

    if (indexToRemove !== -1) {
      // this.setState((state, prevState) => {
      //   const ingredients = state.ingredients.filter((ingredient, index) => index !== indexToRemove);
      //   return { ingredients };
      // });
      this.setState({
        ingredients: ingredients.filter((ingredient, index) => index !== indexToRemove)
      })
    }
  }

  saveBurger = () => {
    const inputName = document.getElementById('burgerName');
    if (inputName.value) {
      const newBurger = {
        name: inputName.value,
        ingredients: this.state.ingredients
      };

      if (this.props.burger) {
        this.props.ls.updateBurger(this.props.id, newBurger);
        this.props.update(newBurger.name);
        if (!document.getElementsByClassName('success').length) {
          printMessage('Your burger has been updated', 'success');
        }
        
      } else {
        this.props.ls.insertBurger(newBurger);
        inputName.value = '';
        this.setState({ ingredients: [] });
        printMessage('Your burger has been saved', 'success');
      }

    } else if (!document.getElementsByClassName('error').length) {
      printMessage('Please, enter a name for your burger', 'error');
    }
  }

  resetState = () => this.setState({ ingredients: [] });

  render() {
    return (
      <div id="burger-builder">
        <div id="burger">
          <div className="top-bread"></div>
            {this.state.ingredients.map((ingredient, index) => <div key={index} className={ingredient.replace(' ', '-')}></div>)}
          <div className="bottom-bread"></div>
        </div>
        <Details ingredients={this.state.ingredients} />
        <p>Tell SpongeBob your ingredients from bottom to top!</p>
        <div id="add-buttons">
          {availableIngredients.map(ingredient => <button key={`Add ${ingredient}`} className="add-ingredient" value={ingredient} onClick={this.addIngredient}>{`${ingredient} +1`}</button>)}
        </div>
        {this.state.ingredients.length ? <p>Tell SpongeBob a ingredient to remove</p> : null}
        <div id="remove-buttons">
          {availableIngredients.map(ingredient => this.state.ingredients.includes(ingredient) ? <button key={`Remove ${ingredient}`} className="remove-ingredient" value={ingredient} onClick={this.removeIngredient}>{`${ingredient} -1`}</button> :  null)}
        </div>
        <figure id="burger-ingredients">
          <img alt="burger ingredients" src="images/krabby-patty.png"/>
        </figure>
        <form onSubmit={e => e.preventDefault()}>
          <input type="text" id="burgerName" placeholder="Krabby Patty Name" defaultValue={this.props.burger ? this.props.burger.name : ''}/>
          <button id="save_button" onClick={this.saveBurger}>{`${this.props.burger ? 'Update' : 'Save'} Burger`}</button>
          <button id="reset_button" onClick={this.resetState}>Reset Burger</button>
        </form>
      </div>
    );
  }
}

Burger.propTypes = {
  ls: PropTypes.object.isRequired,
  id: PropTypes.number,
  burger: PropTypes.object,
  update: PropTypes.func
}

export default Burger;