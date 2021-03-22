import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import PokemonCatchResultForm from '../PokemonCatchResultForm/PokemonCatchResultForm';
import './PokemonCatchResult.css';

class PokemonCatchResult extends Component {
	handleClose = (params) => {
		this.props.onClose(params)
	}

	onSavePokemon = (nickname) => {
		this.props.savePokemon(nickname)
	}

	render() {
		let formResult;

		if (this.props.result) {
			formResult = <PokemonCatchResultForm savePokemon={ this.onSavePokemon } closeModal={ this.handleClose }/>
		} else {
			formResult = null;
		}

		return (
			<div className="pokemon-catch">
				<div className="pokemon-catch__close">
					<FaTimes onClick={ () => this.handleClose( this.props.isFailedModal ? 'close-warning' : '') } />
				</div>

				<div className="pokemon-catch__message">
					<span>{ this.props.message }</span>
				</div>

				{ formResult }
			</div>
		)
	}
}

export default PokemonCatchResult;