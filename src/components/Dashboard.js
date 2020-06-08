import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import { fetchUser } from '../actions'; 
import Spinner from './Spinner'; 
import Form from './Form';
import ChartSection from './ChartSection';
import StatsSection from './StatsSection';

class Dashboard extends Component {

  componentDidMount () {
    this.props.fetchUser(this.props.match.params.username); 
  }

  render () {
    const { data, isLoading } = this.props.user

      if (data && !isLoading) {
        console.log(data)
        return (
          <main className="Dashboard">
            <Form />
            <StatsSection />
            <ChartSection />
          </main>
        )
      } else if (isLoading && !data) {
        return <Spinner/>
      }  else {
        return <Spinner />
      }
  }    
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, { fetchUser })(Dashboard)