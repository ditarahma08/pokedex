import React, { Component } from 'react';
import PokemonListAll from './components/PokemonListAll/PokemonListAll';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      pokemon: {},
      pokemonName: '',
      page: 'pokemon-list'
    };
  }

  componentDidMount() {
    this.fetchPokemonList()
  }

  fetchPokemonList() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    .then(response => response.json())
    .then(data => this.setState({ pokemons: data.results }))
  }

  fetchPokemonDetail(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(data => {
      this.setState({ pokemon: data, page: 'pokemon-detail' })
    })
  }

  openPokemonDetail = (data) => {
    this.setState({ pokemonName: data.name })
    this.fetchPokemonDetail(data.name)
  }

  render() {

    const { pokemons, pokemon, pokemonName, page } = this.state;
    let mainPage;
    if (page === 'pokemon-list') {
      mainPage = <PokemonListAll pokemons={ pokemons } onOpenDetail={ this.openPokemonDetail }></PokemonListAll>;
    } else {
      mainPage = <PokemonDetail pokemonDetail={ pokemon } pokemonName={ pokemonName }></PokemonDetail>;
    }

    return (
      <Router>
        <div className="pokedex-main">
          <header className="pokedex-main__header">
            <img src={ logo } alt="poke-logo" className="pokedex-main__logo"/>
            <h4 className="pokedex-main__title">Pokemon Database</h4>
          </header>

          <section className="pokedex-main__section">
            <div className="pokedex-main__menu">
              <NavLink exact to="/" className="pokedex-main__tab" activeClassName="active">
                <span>Browse Pokemon</span>
              </NavLink>
              <NavLink to="/my-pokemon" className="pokedex-main__tab" activeClassName="active">
                <span>My Pokemon</span>
              </NavLink>
            </div>

            <div className="pokedex-main__content">
              <Switch>
                <Route path="/">
                  { mainPage }
                </Route>
              </Switch>
            </div>
          </section>
        </div>
      </Router>
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
