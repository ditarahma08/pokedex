import React, { Component } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import PokemonDetailMoves from './PokemonDetailMoves';
import './PokemonDetail.css';

class PokemonDetail extends Component {
	constructor() {
		super();
		this.state = {
			activeIndex: 0,
			moveDetail: {},
			type: '',
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
		console.log(isCaught);
		if (isCaught === 1) {
			console.log('catch successful')
		} else {
			console.log('catch failed')
		}
	}

	render() {
		const { activeIndex, moveDetail, type } = this.state

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
							</table>
						</div>
						<FaChevronCircleRight className="pokemon-detail__nav" onClick={ this.nextMove } />
					</div>
				</div>
			</div>
		)
	}
}

export default PokemonDetail;