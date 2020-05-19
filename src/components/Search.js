import React, {Component, Fragment} from 'react'; 
import { connect } from 'react-redux'; 
import { fetchUser } from '../actions'; 

import Spinner from './Spinner'; 

class Search extends Component {
  constructor () {
    super();  
    this.state = {value: ''}
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault(); 

    if(this.state.value === '') {
      alert('Please enter a valid username')
    } else {    
      this.props.fetchUser(this.state.value);
      this.setState({value: ''});
    }
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  render () {
    const { isLoading, error } = this.props

    if (isLoading) {
      return <Spinner/>
    } else {
      return (
        <Fragment>
            
          <form onSubmit={this.handleSubmit} className="MainSearch">
            <h1 className="MainSearch__Title">Track any instagram account</h1>
  
            <div className="MainSearch__Bar">   
              <i className="fas fa-search"></i>        
              <input 
                placeholder="ex. kimkardashian"
                type="text" 
                value={this.state.value} 
                onChange={this.handleChange}
              ></input>            
              <button type='submit'>SEARCH</button>      
            </div>
  
          </form>
        </Fragment>
      ); 
    }
  }
}
const mapStateToProps = state => {
  return {
      isLoading: state.user.isLoading, 
      error: state.user.requestError
    }
}
export default connect(mapStateToProps, {fetchUser})(Search); 