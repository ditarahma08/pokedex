import React, { Component } from 'react';
import './PokemonCollection.css';
import '../PokemonListAll/PokemonListAll.css';

class PokemonCollection extends Component {
	handleRelease = (name) => {
		this.props.onRelease(name)
	}

	render() {
		return (
			<div className="pokemon-list">
				{ this.props.pokemons.map(pokemon => (
				<div className="pokemon-list__card" key={ pokemon.name }>
					<img alt="pokemon" src={ `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg` }/>
					<span className="pokemon-list__name">{ pokemon.name.toUpperCase() }
					</span>
					<span className="pokemon-list__nickname">Nickname: { pokemon.nickname.toUpperCase() }</span>
					<button type="button" onClick={ () => this.handleRelease(pokemon.nickname) }>Release</button>
				</div>
				))}

			</div>
		)
	}
};

export default PokemonCollection;