import React, { Component } from "react"
import composeClass from "classnames"

import collection from './constants.js'

class CharacterBox extends Component {
	render() {
		let cls = composeClass({
			chabox: true,
			[this.props.character]: this.props.character === this.props.chosen
		})
		let {name, image} = collection[this.props.character]
		return (
			<td className={cls} onClick={this.props.onClick}>
				<div id={this.props.character} style={{margin: "3px"}}>
					<img title={name} alt={name} src={image} style={{height: "70px", width:"70px"}} />
				</div>
			</td>
		)
	}
}

export default CharacterBox
