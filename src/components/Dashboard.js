import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'; 
import { fetchUser } from '../actions'; 
import Spinner from './Spinner'; 
import Form from './Form';
import ChartSection from './ChartSection';
import StatsSection from './StatsSection';

const Error = ({value}) => {
  return (
    <aside style={{ color: 'red' }} className="px-3 py-4 px-sm-5">
      The account @{value} was not found on Instagram.
    </aside>
  )
}

class Dashboard extends Component {

  componentDidMount () {
    this.props.fetchUser(this.props.match.params.username); 
  }

  render () {
    const { data, isLoading, requestError} = this.props.user

      if (data && !isLoading) {
        console.log(requestError)
        return (
          <main className="Dashboard">
            <Form />
            {requestError 
                ? <Error value={requestError.inputValue}/>
                : (<Fragment>
                    <StatsSection />
                    <ChartSection />
                  </Fragment>)
            }       
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