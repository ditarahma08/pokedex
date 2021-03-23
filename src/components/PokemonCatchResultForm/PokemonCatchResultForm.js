import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './PokemonCatchResultForm.css';

const cookies = new Cookies();

class PokemonCatchResultForm extends Component {
	constructor() {
		super();
		this.state = {
			nickname: '',
			myPokemonList: [],
			showWarning: false
		}
	}

	componentDidMount = () => {
		const myList = cookies.get('my-pokemon')
		if (myList !== undefined) {
			this.setState({ myPokemonList: myList })
		}
	}

	changeName = (event) => {
		this.setState({ nickname: event.target.value })
	}

	savePokemon = () => {
		const isNameExist = this.state.myPokemonList.find(pokemon => pokemon.nickname === this.state.nickname)
		console.log(isNameExist)
		if (isNameExist) {
			this.setState({ showWarning: true })
			this.props.closeModal('failed')
		} else {
			this.setState({ showWarning: false })
			this.props.savePokemon(this.state.nickname)
			this.setState({ nickname: '' })
			this.props.closeModal('success')
		}

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