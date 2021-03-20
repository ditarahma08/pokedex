import React, { Component } from 'react';
import { PokemonListAll } from './components/PokemonListAll/PokemonListAll';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      page: 'pokemon-list'
    };
  }

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    .then(response => response.json())
    .then(data => this.setState({ pokemons: data.results }))
  }

  render() {

    const { pokemons } = this.state;

    return (
      <div className="pokedex-main">
        <header className="pokedex-main__header">
          <img src={ logo } alt="poke-logo" className="pokedex-main__logo"/>
          <h4 className="pokedex-main__title">Pokemon Database</h4>
        </header>

        <section className="pokedex-main__section">
          <ul className="pokedex-main__menu">
            <li className="pokedex-main__tab">
              <span>Browse Pokemon</span>
            </li>
            <li className="pokedex-main__tab">
              <span>My Pokemon</span>
            </li>
          </ul>

          <div className="pokedex-main__content">
            <PokemonListAll pokemons={ pokemons }></PokemonListAll>
          </div>
        </section>
      </div>
    ); 

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

 }
}

export default App;
