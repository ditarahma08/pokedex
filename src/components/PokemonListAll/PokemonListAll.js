import React, { Component } from 'react';
import './PokemonListAll.css';

class PokemonListAll extends Component {
	handleOpenDetail = (data) => {
		this.props.onOpenDetail(data)
	}

	render() {
		return (
			<div className="pokemon-list">
				{ this.props.pokemons.map(pokemon => (
				<div className="pokemon-list__card" key={ pokemon.name } onClick={ () => this.handleOpenDetail(pokemon) }>
					<img alt="pokemon" src={ `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg` }/>
					<h2>{ pokemon.name.toUpperCase() }
					</h2>
				</div>
				))}
			</div>
		)
	}
};

export default PokemonListAll;