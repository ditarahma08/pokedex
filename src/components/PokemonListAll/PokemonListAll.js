import React, { Component } from 'react';
import './PokemonListAll.css';

class PokemonListAll extends Component {
	handleOpenDetail = (data) => {
		this.props.onOpenDetail(data)
	}

	generatePokemonUrl = (url) => {
		let pokemonId = url.replace('https://pokeapi.co/api/v2/pokemon/', '').slice(0, -1)
		if (pokemonId.length === 1) {
			pokemonId = `00${pokemonId}`
		} else if (pokemonId.length === 2) {
			pokemonId = `0${pokemonId}`
		}

		return `https://www.serebii.net/pokemongo/pokemon/${pokemonId}.png`
	}

	render() {
		return (
			<div className="pokemon-list">
				{ this.props.pokemons.map(pokemon => (
				<div className="pokemon-list__card" key={ pokemon.name } onClick={ () => this.handleOpenDetail(pokemon) }>
					<img alt="pokemon" src={ this.generatePokemonUrl(pokemon.url) }/>
					<h2>{ pokemon.name.toUpperCase() }
					</h2>
				</div>
				))}
			</div>
		)
	}
};

export default PokemonListAll;