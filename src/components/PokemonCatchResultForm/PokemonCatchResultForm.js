import React, { Component } from 'react';
import './PokemonCatchResultForm.css';

class PokemonCatchResultForm extends Component {
	constructor() {
		super();
		this.state = {
			nickname: ''
		}
	}

	changeName = (event) => {
		this.setState({ nickname: event.target.value })
	}

	savePokemon = () => {
		this.props.savePokemon(this.state.nickname)
		this.setState({ nickname: '' })
		this.props.closeModal('success')
	}

	render() {
		return (
			<div className="pokemon-result">
				<div className="pokemon-result__form">
					<input type="text" name="pokemon" placeholder="Type the name here..." value={ this.state.nickname } onChange={ this.changeName } />
				</div>

				<div className="pokemon-result__button">
					<button type="button" disabled={ this.state.nickname === '' } onClick={ this.savePokemon }>Save</button>
				</div>
			</div>
		)
	}
}

export default PokemonCatchResultForm