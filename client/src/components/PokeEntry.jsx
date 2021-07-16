import React from 'react';
import axios from 'axios';


class PokeEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayInput: false,
      newName: ''
    }
    this.toggleInput = this.toggleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  toggleInput() {
    this.setState({
      displayInput: !this.state.displayInput
    })
  }
  handleChange(e) {
    this.setState({
      newName: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    axios.put(`/api/${this.props.poke._id}`,
      {
        name: this.state.newName
      })
      .then(() => {
        this.props.fetchpoke();
        this.toggleInput();
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleDelete(e) {
    e.preventDefault();
    axios.delete(`/api/${this.props.poke._id}`)
      .then(() => {
        this.props.fetchpoke();
        this.toggleInput();
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        {this.state.displayInput ?
          <form>
            <input
              placeholder={`Chang poke's name`}
              onChange={this.handleChange}>
            </input>
            <button onClick={this.handleSubmit}>Confirm</button>
            <button onClick={this.handleDelete}>Delete</button>
          </form>
          : null}
        <h3 onClick={this.toggleInput}>{this.props.poke.name}</h3>
        <img src={this.props.poke.img} />
      </div>
    )
  }
}

export default PokeEntry;