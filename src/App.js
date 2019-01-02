import React, { Component } from 'react';
import CharacterBox from "./app/character-box.js"
import Objection from "./Objection_HD.png"
import constants from './app/constants.js'
import Modal from './app/modal.js'
import DIVV from "./app/sceneGenerator.js"

function adaptErrorMessage(toSpeak, chosenGuy) {
  let text = ""
  if (!chosenGuy) {
    text = "You haven't chosen a character yet! Pick one from the boxes."
  } else if (!toSpeak.trim()) {
    text = "You should let the character speak something before you continue."
  }
  alert(text)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosen: "",
      side: "",
      showModal: false,
      text: ""
    }
  }

  componentDidMount() {
    this.textbox = this.refs.text
  }

  setCharacter(char) {
    let copy = Object.assign({}, this.state)

    if (copy.chosen !== char) {
      this.textbox.value = ""
    }

    copy.chosen = char
    copy.side = constants[char].side || "Prosecutor"

    this.setState(copy)
  }  

  createNewCharacter(character) {
    return <CharacterBox chosen={this.state.chosen} onClick={() => this.setCharacter(character)} character={character} />
  }

  checkSceneRun() {
    if (!this.state.chosen || !this.textbox.value.trim()) adaptErrorMessage(this.textbox.value, this.state.chosen)
    else this.runScene()
  }

  runScene() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    let modal = this.state.showModal ? (
      <Modal show={this.state.showModal}>
        <DIVV side={this.state.side} character={this.state.chosen} text={this.textbox.value} />
      </Modal>
    ) : null
    
    let characterName = constants[this.state.chosen] ? constants[this.state.chosen].name : ""
    let side = characterName ? " -- " + this.state.side : ""
    return (
      <React.Fragment>
        <header>
          Ace Attorney Objection Generator
        </header>
        <div className="table">
          <table style={{height: "auto", width: "auto"}}>
            <tbody>
              <tr>
                {this.createNewCharacter("phoenix")}
                {this.createNewCharacter("payne")}
                {this.createNewCharacter("edgeworth")}
                {this.createNewCharacter("karma")}
                {this.createNewCharacter("franny")}
                {this.createNewCharacter("payne2")}
              </tr>
              <tr>
                {this.createNewCharacter("mia")}
                {this.createNewCharacter("godot")}
                {this.createNewCharacter("edgeworth2")}
                {this.createNewCharacter("apollo")}
                {this.createNewCharacter("payne3")}
                {this.createNewCharacter("klavier")}
              </tr>
            </tbody>
          </table>
          {characterName} {side}
        </div>
        <div className="text">
          <textarea style={{resize: "none", width: "256px"}} maxLength={63} ref="text" readOnly={this.state.side === ""} rows={3} cols={27} placeholder={characterName ? "What should " + characterName + " say?" : "Please select a character to begin"}></textarea>
        </div>
        <div className="button">
          <button style={{backgroundColor: "#FFFFFF"}} onClick={() => { this.checkSceneRun() }}>
            <img src={Objection} style={{width: "92px", height: "72px"}} alt="Shout Objection" />
          </button>
        </div>
        <div>{modal}</div>
        Profile images courtesy of <a href="court-records.net">www.court-records.net</a>. Assets courtesy of PyWright.<br />
        All rights belong to the Ace Attorney licence, provided by Capcom.
      </React.Fragment>
    )
  }
}

export default App;
