export class LocalStorage {
  constructor() {
    this.getReady();
  }

  getReady() {
    if(!localStorage.getItem('burgerList')) {
      localStorage.setItem('burgerList', JSON.stringify([]));
    }
  }

  getAllBurgers() {
    return JSON.parse(localStorage.getItem('burgerList'));
  }

  insertBurger(burger) {
    const allBurgers = this.getAllBurgers();
    allBurgers.push(burger);
    localStorage.setItem('burgerList', JSON.stringify(allBurgers));
  }

  updateBurger(id, newBurger) {
    const allBurgers = this.getAllBurgers();
    const updatedBurgers = allBurgers.map((burger, index) => index !== id ? burger : newBurger);
    localStorage.setItem('burgerList', JSON.stringify(updatedBurgers));
  }

  deleteBurger(id) {
    const allBurgers = this.getAllBurgers();
    const updatedBurgers = allBurgers.filter((burger, index) => index !== id);
    localStorage.setItem('burgerList', JSON.stringify(updatedBurgers));
  }
}