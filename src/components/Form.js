import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import { fetchUser } from '../actions'; 
import { FaInstagram } from 'react-icons/fa'

class Form extends Component {
  state = { value: '' }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchUser(this.state.value);
    this.setState({ value: '' });
  }
 
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="rounded-lg px-3 py-2 Dashboard__form">
        <FaInstagram className="Dashboard__form__logo" style={{ fontSize: '1.5rem' }} />
        <input onChange={this.handleChange} type="text" value={this.state.value} className="Dashboard__input form-control" placeholder="Search instagram" />
      </form>
    )
  }
}

export default connect(null, { fetchUser })(Form)


