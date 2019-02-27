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

  checkCell = () => {
    console.log('cell was left clicked')
  }

  flagCell = event => {
    event.preventDefault()
    console.log('cell was right clicked')
  }

  render() {
    return (
      <main>
        <section>
          <h1>💣 Fart Bombs! 💣</h1>
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
              {this.state.game.map(row => {
                return (
                  <tr>
                    {row.map(col => {
                      return (
                        <td
                          onClick={this.checkCell}
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
