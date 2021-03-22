import React, { Component } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import PokemonCatchResult from '../PokemonCatchResult/PokemonCatchResult';
import './PokemonDetail.css';

class PokemonDetail extends Component {
	constructor() {
		super();
		this.state = {
			activeIndex: 0,
			moveDetail: {},
			type: '',
			isCaught: false,
			showModalCatch: false,
			showModalSuccess: false,
			showModalFailed: false,
			caughtMessage: ''
		}
	}

	componentDidMount() {
		this.fetchMoveDetail(this.props.pokemonDetail.moves[0].move.url)
	}

	fetchMoveDetail(url) {
		fetch(url)
		.then(response => response.json())
		.then(data => this.setState({ moveDetail: data, type: data.type.name}))
	}

	prevMove = () => {
		if (this.state.activeIndex > 0) {
			let index = this.state.activeIndex - 1
			this.setState({ activeIndex: index })
			this.fetchMoveDetail(this.props.pokemonDetail.moves[index].move.url)
		}
	}

	nextMove = () => {
		if (this.state.activeIndex < this.props.pokemonDetail.moves.length) {
			let index = this.state.activeIndex + 1
			this.setState({ activeIndex: index })
			this.fetchMoveDetail(this.props.pokemonDetail.moves[index].move.url)
		}
	}

	catchPokemon = () => {
		const isCaught = Math.floor(Math.random() * Math.floor(2))
		console.log(isCaught)
		if (isCaught === 1) {
			this.setState({ isCaught: true, caughtMessage: 'Congratulations! You have caught the pokemon! Give it a nickname:' })
		} else {
			this.setState({ caughtMessage: 'Sorry! You have to try again!'} )
		}
		this.setState({ showModalCatch: true })
	}

	closeModalCatch = (params) => {
		this.setState({ showModalCatch: false, isCaught: false })
		if (params === 'success') {
			this.openModalSaveSuccess()
		} else if (params === 'failed') {
			this.openModalSaveFailed()
		}
	}

	openModalSaveSuccess = () => {
		this.setState({ showModalSuccess: true })
	}

	openModalSaveFailed = () => {
		this.setState({ showModalFailed: true })
	}

	closeModalSuccess = () => {
		this.setState({ showModalSuccess: false })
	}

	closeModalFailed = () => {
		this.setState({ showModalFailed: false, isCaught: true, showModalCatch: true })
	}

	onSavePokemon = (nickname) => {
		this.props.savePokemon(nickname)
	}

	render() {
		const { activeIndex, moveDetail, type, showModalCatch, isCaught, caughtMessage, showModalSuccess, showModalFailed } = this.state

		let modalCatch, modalSuccess, modalFailed

		if (showModalCatch) {
			modalCatch = <PokemonCatchResult result={ isCaught } onClose={ this.closeModalCatch } message={ caughtMessage } savePokemon={ this.onSavePokemon } />
		} else {
			modalCatch = null
		}

		if (showModalSuccess) {
			modalSuccess = <PokemonCatchResult result={ false } onClose={ this.closeModalSuccess } message="Pokemon is saved!" />
		} else {
			modalSuccess = null
		}

		if (showModalFailed) {
			modalFailed = <PokemonCatchResult result={ false } onClose={ this.closeModalFailed } message="Nickname is exists! Please use another nickname!" isFailedModal={ true } />
		} else {
			modalFailed = null
		}

		return (
			<div className="pokemon-detail">
				<div className="pokemon-detail__main">
					<img src={ `https://img.pokemondb.net/artwork/large/${this.props.pokemonName}.jpg` } />
					<h2>{ this.props.pokemonName.toUpperCase() }</h2>
					<button type="button" onClick={ this.catchPokemon }>Catch</button>
				</div>

				<div className="pokemon-detail__content">
					<div className="pokemon-detail__profile">
						<FaChevronCircleLeft className="pokemon-detail__nav" onClick={ this.prevMove } />
						<div className="pokemon-detail__move">
							<span className="pokemon-detail__move-name">
								{ this.props.pokemonDetail.moves[activeIndex].move.name }
							</span>

							<div className="pokemon-detail__move-type">
								<span>
									Type: { type ? type.toUpperCase() : 'XXXXX' }
								</span>
							</div>

							<table>
								<tbody>
									<tr>
										<td>Accuracy:</td>
										<td>{ moveDetail.accuracy ? moveDetail.accuracy : 'xxx' }</td>
									</tr>
									<tr>
										<td>Power:</td>
										<td>{ moveDetail.power ? moveDetail.power : 'xxx' }</td>
									</tr>
									<tr>
										<td>PP:</td>
										<td>{ moveDetail.pp ? moveDetail.pp : 'xxx' }</td>
									</tr>
								</tbody>
							</table>
						</div>
						<FaChevronCircleRight className="pokemon-detail__nav" onClick={ this.nextMove } />
					</div>
				</div>

				{ modalCatch }

				{ modalSuccess }

				{ modalFailed }
			</div>
		)
	}
}

export default PokemonDetail;