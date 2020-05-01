import React, { Component } from 'react';
import Details from './Details';
import { availableIngredients } from '../helpers/ingredientsDetails';
import { printMessage } from '../helpers/ui';
import './css/burger.css';

class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.burger ?  { ingredients: this.props.burger.ingredients } : { ingredients: [] };
  }

  addIngredient(e) {
    const newIngredient = e.target.value;

    if (availableIngredients.indexOf(newIngredient) !== -1) {
      this.setState(state => {
        const ingredients = [newIngredient, ...state.ingredients];
        return { ingredients };
      });
    }
  }

  removeIngredient(e) {
    const indexToRemove = this.state.ingredients.indexOf(e.target.value);

    if (indexToRemove !== -1) {
      this.setState(state => {
        const ingredients = state.ingredients.filter((ingredient, index) => index !== indexToRemove);
        return { ingredients };
      });
    }
  }

  saveBurger() {
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
          {availableIngredients.map(ingredient => <button key={`Add ${ingredient}`} className="add-ingredient" value={ingredient} onClick={e => this.addIngredient(e)}>{`${ingredient} +1`}</button>)}
        </div>
        {this.state.ingredients.length ? <p>Tell SpongeBob a ingredient to remove</p> : null}
        <div id="remove-buttons">
          {availableIngredients.map(ingredient => this.state.ingredients.includes(ingredient) ? <button key={`Remove ${ingredient}`} className="remove-ingredient" value={ingredient} onClick={e => this.removeIngredient(e)}>{`${ingredient} -1`}</button> :  null)}
        </div>
        <figure id="burger-ingredients">
          <img alt="burger ingredients" src="images/krabby-patty.png"/>
        </figure>
        <form onSubmit={e => e.preventDefault()}>
          <input type="text" id="burgerName" placeholder="Krabby Patty Name" defaultValue={this.props.burger ? this.props.burger.name : ''}/>
          <button id="save_button" onClick={() => this.saveBurger()}>{`${this.props.burger ? 'Update' : 'Save'} Burger`}</button>
          <button id="reset_button" onClick={() => this.setState({ ingredients: [] })}>Reset Burger</button>
        </form>
      </div>
    );
  }
}
 
export default Burger;