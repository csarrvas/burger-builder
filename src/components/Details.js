import React, { Component } from 'react';
import { ingredientsDetail } from '../helpers/ingredientsDetails';
import './css/details.css';
import PropTypes from 'prop-types';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { currencyMultiplier: 1 };
  }

  updateDetail() {
    ingredientsDetail.forEach(element => {
      element.units = 0;
      this.props.ingredients.forEach(ingredient => {
        if (ingredient === element.name) {
          element.units++;
        }
      });
    });
  }

  changeMonetaryUnit(e) {
    switch (e.target.value) {
      case 'USD':
        this.setState({ currencyMultiplier: 1 });
        break;
      case 'AUD':
        this.setState({ currencyMultiplier: 1.53 });
        break;
      case 'MXN':
        this.setState({ currencyMultiplier: 23.83 });
        break;
      default:
        break;
    }
  }

  render() {
    this.updateDetail();
    return (
      <div id="detail">
        <select onChange={(e) => this.changeMonetaryUnit(e)}>
          <option value="USD">USD</option>
          <option value="AUD">AUD</option>
          <option value="MXN">MXN</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Units</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {ingredientsDetail.map(ingredient => 
              ingredient.units > 0 ?
              <tr key={`Detail-${ingredient.name}`}>
                <td>{ingredient.name}</td>
                <td>{ingredient.units}</td>
                <td>{`$ ${(ingredient.units * ingredient.price * this.state.currencyMultiplier).toFixed(2)}`}</td>
              </tr> : null
            )}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td className="align-right total">Total:</td>
              <td className="total">{`$ ${((ingredientsDetail.reduce((total, ingredient) => total + (ingredient.units * ingredient.price), 1)) * this.state.currencyMultiplier).toFixed(2)}`}</td>
            </tr>
          </tfoot>
        </table>
        <p>{`The burger has a base price of $ ${this.state.currencyMultiplier.toFixed(2)}`}</p>
      </div>
    );
  }
}

Details.propTypes = {
  ingredients: PropTypes.array.isRequired,
}

export default Details;