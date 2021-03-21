import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import PokemonCatchResultForm from '../PokemonCatchResultForm/PokemonCatchResultForm';
import './PokemonCatchResult.css';

class PokemonCatchResult extends Component {
	handleClose = () => {
		this.props.onClose()
	}

	render() {
		let formResult;

		if (this.props.result) {
			formResult = <PokemonCatchResultForm />
		} else {
			formResult = null;
		}

		return (
			<div className="pokemon-catch">
				<div className="pokemon-catch__close">
					<FaTimes onClick={ this.handleClose } />
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