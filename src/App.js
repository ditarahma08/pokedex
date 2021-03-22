import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import PokemonListAll from './components/PokemonListAll/PokemonListAll';
import PokemonCollection from './components/PokemonCollection/PokemonCollection';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

const cookies = new Cookies();

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      pokemon: {},
      pokemonName: '',
      page: 'pokemon-list',
      myPokemonList: []
    };
  }

  componentDidMount() {
    this.fetchPokemonList()
    this.initMyPokemonList()
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

  initMyPokemonList = () => {
    const savedList = cookies.get('my-pokemon')
    if (savedList !== undefined) {
      this.setState({ myPokemonList: savedList })
    }
  }

  openPokemonDetail = (data) => {
    this.setState({ pokemonName: data.name })
    this.fetchPokemonDetail(data.name)
  }

  onSavePokemon = (nickname) => {
    const ownedPokemons = this.state.myPokemonList
    ownedPokemons.push({
      name: this.state.pokemonName,
      nickname: nickname,
    })
    this.setState({ myPokemonList: ownedPokemons })

    this.savePokemonList(ownedPokemons)
  }

  savePokemonList = (list) => {
    const myList = JSON.stringify(list)
    this.savePokemonCookies(myList)
  }

  savePokemonCookies = (list) => {
    if (cookies.get('my-pokemon') !== undefined) {
      cookies.remove('my-pokemon')
    }

    cookies.set('my-pokemon', list)
  }

  releasePokemon = (nickname) => {
    const ownedPokemons = this.state.myPokemonList
    const pokemonIndex = ownedPokemons.findIndex(pokemon => pokemon.nickname === nickname)
    ownedPokemons.splice(pokemonIndex, 1)
    this.savePokemonCookies(ownedPokemons)
    window.location.reload()
  }

  render() {

    const { pokemons, pokemon, pokemonName, page } = this.state;
    let mainPage;
    if (page === 'pokemon-list') {
      mainPage = <PokemonListAll pokemons={ pokemons } onOpenDetail={ this.openPokemonDetail }></PokemonListAll>;
    } else {
      mainPage = <PokemonDetail pokemonDetail={ pokemon } pokemonName={ pokemonName } savePokemon={ this.onSavePokemon }></PokemonDetail>;
    }

    return (
      <Router>
        <div className="pokedex-main">
          <header className="pokedex-main__header">
            <img src={ logo } alt="poke-logo" className="pokedex-main__logo"/>
            <h4 className="pokedex-main__title">Pokédex</h4>
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
                <Route exact path="/">
                  { mainPage }
                </Route>
                <Route path="/my-pokemon">
                  <PokemonCollection pokemons={ this.state.myPokemonList } onRelease={ this.releasePokemon } />
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
