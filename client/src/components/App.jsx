import React from 'react';
import axios from 'axios';
import PokeEntry from './PokeEntry.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokes: [],
      type: [],
      name: '',
      _type: '',
      img: ''
    }
    this.fetchpoke = this.fetchpoke.bind(this);
    this.filterType = this.filterType.bind(this);
    this.fetchByType = this.fetchByType.bind(this);
    this.insert = this.insert.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchpoke()
  }

  fetchpoke() {
    axios.get('/api')
      .then(result => {
        this.setState({
          pokes: result.data
        })
      })
      .then(() => this.filterType())
      .catch(err => {
        console.log(err)
      })
  }

  fetchByType(e) {
    if (e.target.value === 'Sort by Type') {
      this.fetchpoke();
    } else {
      axios.get(`/api/${e.target.value}`)
        .then(result => {
          console.log(result)
          this.setState({
            pokes: result.data
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

  }

  filterType() {
    const filtered = [];
    this.state.pokes.forEach(poke => {
      if (!filtered.includes(poke.type)) {
        filtered.push(poke.type)
      }
    })
    console.log(filtered)
    this.setState({
      type: filtered
    })
  }

  insert(e) {
    e.preventDefault();
    axios.post('/api', {
      name: this.state.name,
      type: this.state._type,
      img: this.state.img
    })
      .then(result => {
        this.fetchpoke();
      })
      .then(() => this.filterType())
      .catch(err => {
        console.log(err)
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  render() {
    return (
      <div>
        <div>
          <h1>Pokemon!</h1>
          <button onClick={this.fetchpoke}>Show All</button>
          <select id="type" onChange={this.fetchByType}>
            <option>Sort by Type</option>
            {
              this.state.type.map(type => {
                return (
                  <option>{type}</option>
                )
              })
            }
          </select>
          <form>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                id='name'
                name='name'
                onChange={this.handleChange}>
              </input>
            </div>
            <div>
              <label htmlFor='type' >Type</label>
              <input
                id='type'
                name='_type'
                onChange={this.handleChange}>
              </input>
            </div>
            <div>
              <label htmlFor='img'>Picture URL</label>
              <input
                id='img'
                name='img'
                onChange={this.handleChange}>
              </input>
            </div>
            <button onClick={this.insert}>INSERT</button>
          </form>
          {
            this.state.pokes.map(poke => {
              return (
                <PokeEntry poke={poke} fetchpoke={this.fetchpoke} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default App;