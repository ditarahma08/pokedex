import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import ReactPaginate from 'react-paginate';
import PokemonSearchBox from './components/PokemonSearchBox/PokemonSearchBox';
import PokemonListAll from './components/PokemonListAll/PokemonListAll';
import PokemonCollection from './components/PokemonCollection/PokemonCollection';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronCircleLeft, FaChevronRight } from 'react-icons/fa';
import './App.css';

const cookies = new Cookies();

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      pokemon: {},
      pokemonName: '',
      pokemonId: 0,
      page: 'pokemon-list',
      myPokemonList: [],
      search: '',
      pagination: {
        total: 0,
        offset: 0
      }
    };
  }

  componentDidMount() {
    this.fetchPokemonList(0)
    this.initMyPokemonList()
  }

  fetchPokemonList(offset) {
    const currentOffset = this.state.pagination.offset
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
    .then(response => response.json())
    .then(data => this.setState({ pokemons: data.results, pagination: { total: data.count, offset: currentOffset + 10 } }))
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
    this.generatePokemonId(data.url)
  }

  generatePokemonId = (url) => {
    let pokemonId = url.replace('https://pokeapi.co/api/v2/pokemon/', '').slice(0, -1)
    if (pokemonId.length === 1) {
      pokemonId = `00${pokemonId}`
    } else if (pokemonId.length === 2) {
      pokemonId = `0${pokemonId}`
    }
    this.setState({ pokemonId: pokemonId })
  }

  onSavePokemon = (nickname) => {
    const ownedPokemons = this.state.myPokemonList
    ownedPokemons.push({
      name: this.state.pokemonName,
      nickname: nickname,
      id: this.state.pokemonId
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

  handlePageChange = (page) => {
    const newOffset = page.selected * 10
    this.setState({ search: '' })
    this.fetchPokemonList(newOffset)
  }

  handleSearch = (params) => {
    this.setState({ search: params })
  }

  backToList = () => {
    this.setState({ page: 'pokemon-list' })
  }

  render() {

    const { pokemons, pokemon, pokemonName, page, search, myPokemonList, pokemonId } = this.state;
    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
    const filteredMyPokemons = myPokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
    let mainPage, headerTop, previous, next;

    if (page === 'pokemon-list') {
      headerTop = <PokemonSearchBox onChange={ this.handleSearch }/>
      mainPage = <PokemonListAll pokemons={ filteredPokemons } onOpenDetail={ this.openPokemonDetail }></PokemonListAll>;
    } else {
      headerTop = <div className="pokedex-main__back" onClick={ this.backToList }><FaChevronCircleLeft /><span>Back to List</span></div>
      mainPage = <PokemonDetail pokemonDetail={ pokemon } pokemonName={ pokemonName } pokemonId={ pokemonId } savePokemon={ this.onSavePokemon }></PokemonDetail>;
    }

    previous = <FaChevronLeft />
    next = <FaChevronRight />

    return (
      <Router>
        <div className="pokedex-main">
          <header className="pokedex-main__header">
            <h4 className="pokedex-main__title">Pokédex</h4>
          </header>

          <section className="pokedex-main__section">
            <div className="pokedex-main__menu">
              <NavLink exact to="/" className="pokedex-main__tab" activeClassName="active" onClick={ () => this.handleSearch('') }>
                <span>Browse Pokemon</span>
              </NavLink>
              <NavLink to="/my-pokemon" className="pokedex-main__tab" activeClassName="active" onClick={ () => this.handleSearch('') }>
                <span>My Pokemon</span>
              </NavLink>
            </div>

            <div className="pokedex-main__content">
              <Switch>
                <Route exact path="/">
                  { headerTop }

                  { mainPage }

                  { this.state.page === 'pokemon-list' &&
                  <ReactPaginate
                    previousLabel={ previous }
                    nextLabel={ next }
                    pageRangeDisplayed={ 2 }
                    marginPagesDisplayed={ 0 }
                    pageCount={ Math.ceil(this.state.pagination.total / 10) }
                    onPageChange={ this.handlePageChange }
                    containerClassName={ 'pokedex-main__pagination' } />
                    }
                </Route>

                <Route path="/my-pokemon">
                  <PokemonSearchBox onChange={ this.handleSearch }/>
                  <PokemonCollection pokemons={ filteredMyPokemons } onRelease={ this.releasePokemon } />
                </Route>
              </Switch>
            </div>
          </section>
        </div>
      </Router>
    );
 }
}

export default App;
