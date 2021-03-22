import React, { Component } from 'react';
import { FaSistrix } from 'react-icons/fa';
import './PokemonSearchBox.css';

class PokemonSearchBox extends Component {
	handleChange = (event) => {
		this.props.onChange(event.target.value)
	}

	render() {
		return (
			<div className="pokemon-search">
				<FaSistrix />
				<input type="search"  placeholder="Search pokemon here..." onChange={ this.handleChange } />
			</div>
		)
	}
}

export default PokemonSearchBox