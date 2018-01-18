// Team of the week: https://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=%7B%22page%22:1,%22quality%22:%22totw_gold%22,%22position%22:%22GK%22%7D
// 604 pages of fifa players: https://www.fifaindex.com/fr/players/604/

import React, { Component } from 'react'
import './App.css'

let requestResult
let requestResults = []
const playersIndex = require('./data/index.json')
console.log(playersIndex)



class App extends Component {
  render() {
    return <div className="App">
        <div className="Settings">
          <h2 className="Sub-title">Create your lineup!</h2>
          <SearchPlayer />
          <div href="#" title="Generate lineup" className="CTA">
            Download your lineup as a JPEG
          </div>
          <div className="Customize">
            <select className="Tactic" defaultValue="433">
              <option value="442">4 - 4 - 2</option>
              <option value="433">4 - 3 - 3</option>
              <option value="352">3 - 5 - 2</option>
            </select>
            <select className="Pitch-style">
              <option value="simple" selected>Simple</option>
              <option value="352">Futuristic</option>
            </select>
          </div>
        </div>
        <Pitch />
      </div>;
  }
}

class SearchPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      isLoading: false,
      noMatches: false,
      results: []
    }
    // Force method binding to React component
    this.updateSearch = this.updateSearch.bind(this)
    this.getPlayersData = this.getPlayersData.bind(this)
  }

  getPlayersData = searchValue => {
    // Find matching players from JSON players index
    const playerFiles = []
    for(const player in playersIndex) {
      const playerName = player.toLocaleLowerCase()
      // Store matches
      if (playerName.includes(searchValue) && playerFiles.length < 5) {
        playerFiles.push(playersIndex[player])
      }
    }
    console.log(playerFiles)
  }

  updateSearch(event) {
    this.setState({ value: event.target.value })
    this.getPlayersData(event.target.value.toLocaleLowerCase().normalize().replace(/\s/g, ''))
    // Display loading message
    this.setState({ isLoading: true})
  }

  render() {
    return <div>
        <input className="Search-player" type="search" value={this.state.value} onChange={this.updateSearch} placeholder="Search for a player..." autoFocus />
        <div className="Results">
          {this.state.noMatches &&
            <div className="Result-player">
              <p className="Status">No matching player</p>
            </div>
          }
          {this.state.results.map(player => (
            <div key={player.id} className="Result-player grabbable">
              <img alt={player.name} src={player.photo} className="Photo" />
              <p className="Name">{player.name}</p>
              <img
                className="Icon"
                alt={`${player.name}'s club`}
                src={player.club}
              />
              <img
                className="Flag"
                alt={`${player.name}'s nation`}
                src={player.flag}
              />
            </div>
          ))}
          {this.state.isLoading &&
            <div className="Result-player">
              <p className="Status">Loading players...</p>
            </div>
          }
        </div>
      </div>
  }
}

class Pitch extends Component {
  render() {
    return (
      <div className="Pitch basic"></div>
    )
  }
}

export default App
