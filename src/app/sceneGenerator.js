import constants from "./constants.js"
import React, { Component } from "react"
import prosecutorBackground from "./img/prosecution.png"
import defenseBackground from "./img/defense.png"
import defense4 from './img/defense4.png'
import defenseBench from './img/dbench.png'
import prosecutionBench from './img/pbench.png'
import prosecution4 from './img/prosecution4.png'
import objection from './../Objection_HD.png'
import textbox from './../textbox.png'
import header from './../header.png'

const assetSettings = {
	Prosecutor: {
		bench: prosecutionBench,
		background: prosecutorBackground,
	},
	"Defense Attorney": {
		bench: defenseBench,
		background: defenseBackground
	}
}

const AA4_settings = {
	Prosecutor: {
		background: prosecution4
	},
	"Defense Attorney": {
		background: defense4
	}
}

class DIV extends Component {
	constructor(props) {
		super(props)
		this.state = {
			blackScreen: true,
			position: "normal",
			shownText: ""
		}

		let gender = ["mia", "franny"].includes(this.props.character) ? "female" : "male"
		let {objection} = constants[this.props.character]

		this.blips = []
		this.frames = []
		this.singleBlip = require("./blip" + gender + ".ogg")
		this.gifs = constants[this.props.character].gifs
		this.blip = new Audio(this.singleBlip)
		this.shout = new Audio(objection)
		this.shout.addEventListener("ended", () => {
			this.setState({blackScreen: false}, () => { this.allowSpeaking(this.blip) })
		})
	}

	fillBlips(length, sound) {
		for (let i = 0; i < length; i++) {
			let newBlip = new Audio(this.singleBlip)
			this.blips.push(newBlip)
		}
	}

	pushLetter(character, index) {
		let newText = this.state.shownText + character
		if (newText !== this.state.shownText) {
			this.setState({
				shownText: newText
			}, () => {
				this.blips[index].play();
			})
		}
	}

	splitText() {
		return this.props.text.split("")
	}

	allowSpeaking(blipSound) {
		let speech = this.splitText()
		this.fillBlips(speech.length, blipSound)

		let blipIndex = 0
		let interval = setInterval(() => {
			if (speech.length) {
				if (this.state.position !== "speaking") {
					this.setState({
						position: "speaking"
					})
				}
				let character = speech.shift()
				this.pushLetter(character, blipIndex)
				blipIndex++
			} else {
				clearInterval(interval)
				this.setState({
					position: "normal"
				})
			}
		}, 80)
	}

	render() {
		let {nametag, style} = constants[this.props.character]
		let gif = this.gifs[this.state.position]
		let tagStyle = style || {}
		let renewBackgrounds = ["apollo", "klavier", "payne3"].includes(this.props.character)

		let blackScreen = this.state.blackScreen ? <div style={{backgroundColor: "#000000", position: "fixed", zIndex: 5, width: "100%", height: "100%"}}></div> : null
		if (this.state.blackScreen) this.shout.play()
		// show the black background of OBJECTION only once
		let sideSettings = assetSettings[this.props.side]
		if (renewBackgrounds) sideSettings = Object.assign(sideSettings, AA4_settings[this.props.side])
		let {background, bench} = sideSettings
		let benchStyle = {
			zIndex: 1,
			position: "fixed"
		}
		return (
			<div className="background" style={{backgroundImage: "url(" + background + ")", height: "192px", width: "256px"}}>
				{blackScreen}
				<img alt="objection" className="objection" src={objection} style={{zIndex: 6, position: "fixed", top: "10%", "left": "8%", height: "80%"}} />
				<img alt={this.props.side} src={bench} style={benchStyle} />
				<img src={gif} alt={this.props.character} style={{position: "fixed", zIndex: 0}} />
				<Textbox nametag={nametag} tagStyle={tagStyle} text={this.state.shownText} />
			</div>
		)
	}
}

class Textbox extends Component {
	render() {
		let commonStyle = {
			position: "fixed", 
			width: "44px", 
			left: "4px", 
			color: "white", 
			bottom: "62px", 
			textAlign: "center", 
			fontFamily: "Ace Attorney", 
			fontSize: "8px"
		}

		let mergedStyles = Object.assign({}, commonStyle, this.props.tagStyle)
		return (
			<React.Fragment>
				<div style={{position: "fixed", top: "118px", left: "2px", zIndex: 4, backgroundImage: `url(${header})`, backgroundSize: "100% auto", width: "100%", "height": "12px"}}>
					<div style={mergedStyles}>
					{this.props.nametag}
					</div>
				</div>
				<div style={{position: "fixed", bottom: "0px", left: "0px", zIndex: 4, backgroundImage: `url(${textbox})`, backgroundSize: "100% auto", width: "100%", "height": "62px"}}>
					<span style={{position: "fixed", left: "3.2px", color: "white", fontFamily: "Ace Attorney", fontSize: "10px"}}>{this.props.text}</span>
				</div>
			</React.Fragment>
		)
	}
}

export default DIV
