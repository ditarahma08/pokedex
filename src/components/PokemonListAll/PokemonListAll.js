import React from 'react';
import './PokemonListAll.css';

export const PokemonListAll = props => (
	<div className="pokemon-list">
		{ props.pokemons.map(pokemon => (
			<div className="pokemon-list__card">
				<img alt="pokemon" src={ `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg` }/>
				<h2>{ pokemon.name.toUpperCase() }
				</h2>
			</div>
		))}
	</div>
);