import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    id: 0,
    game: [[]],
    difficulty: 0,
    mines: 0
  }
  // not yet. review with Mark
  setDifficulty = event => {
    console.log(event)
    if (
      event.target.value === 'Intermediate' &&
      event.target.value !== 'Beginner'
    ) {
      this.setState({ difficulty: 1 })
    } else {
      this.setState({ difficulty: 2 })
    }
  }
  componentDidMount() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', { difficulty: 0 })
      .then(resp => {
        this.setState({
          game: resp.data.board,
          mines: resp.data.mines
        })
        console.log(this.state.mines)
      })
  }

  checkCell = (x, y) => {
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/{
            this.state.game.id
          }/check`,
        { x: y, y: x }
      )
      .then(resp => {
        this.setState({
          game: resp.data.board
          // gameId: resp.data.id
        })
      })
  }

  flagCell = event => {
    event.preventDefault()
    console.log('cell was right clicked')
  }

  render() {
    return (
      <main>
        <section>
          <h1>
            <span role="img">🇩🇴</span> Fart Bombs! <span role="img">🇭🇹</span>
          </h1>
          <select>
            <option>Beginner</option>
            <option onChange={this.setDifficulty}>Intermediate</option>
            <option onChange={this.setDifficulty}>Expert</option>
          </select>
          <button className="reset">Reset</button>
        </section>
        <section className="game_body">
          <table>
            <tbody>
              {this.state.game.map((row, y) => {
                return (
                  <tr>
                    {row.map((col, x) => {
                      return (
                        <td
                          onClick={() => this.checkCell(x, y)}
                          onContextMenu={this.flagCell}
                        >
                          {col}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </main>
    )
  }
}

export default App
