import React, {Component, Fragment} from 'react'; 
import { connect } from 'react-redux'; 
import { fetchUser } from '../actions'; 

import Spinner from './Spinner'; 
import { FaSearch } from 'react-icons/fa';

class Search extends Component {
  state = {value: ''}

  handleSubmit =  (event) => {
    event.preventDefault(); 

    if (this.state.value === '') {
      return 
    } else {    
      this.props.fetchUser(this.state.value);
      this.setState({value: ''});
    }
  }

  handleChange = ({target}) => {
    this.setState({value: target.value})
  }

  render () {
    const { isLoading, error } = this.props
    console.log(error)

    if (isLoading) {
      return <Spinner/>
    } else {
      return (
        <Fragment>
            
          <form onSubmit={this.handleSubmit} className="MainSearch">
            <h1 className="MainSearch__Title text-muted">Track any instagram account</h1>
            <div className="MainSearch__Bar">   
              <FaSearch className="MainSearch__Bar__icon"/>     
              <input 
                placeholder="ex. kimkardashian"
                type="text" 
                value={this.state.value} 
                onChange={this.handleChange}
              />           
            </div>
            {error && <label style={{ marginTop: '1rem', color: 'red' }}>{`The account @${error.inputValue} was not found on Instagram`}</label>}          
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