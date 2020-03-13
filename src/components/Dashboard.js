import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import {fetchUser} from '../actions'; 
import Spinner from './Spinner'; 

class Dashboard extends Component {
  componentDidMount () {
    this.props.fetchUser(this.props.match.params.username); 
  }
  render () {
    if (!this.props.user) {
      return (<Spinner/>); 
    }
    const { 
      name, 
      username, 
      profile_picture, 
      is_verified, 
      biography, 
      follower_count, 
      following_count} = this.props.user.profile

      const {average_likes, average_comments} = this.props.user.summary; 

      const costPerPost = (((average_likes+average_comments) * 0.025) + (follower_count * 0.0025)).toFixed(2)

      const options = {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'My chart'
        },
        series: [
          {
            data: [1, 2, 1, 4, 3, 6]
          }
        ]
      }

    return (
      <div className="Dashboard ">
  
        <div className="Dashboard__Header">
          <i class="fab fa-instagram"></i>
          <input type="text" placeholder="Search Instagram"></input>

          <div className="Dashboard__Stats">
            <div className='Dashboard__Stats__Image'>
              <i className="fas fa-check-circle fa-2x" style={{visibility: is_verified? 'visible': 'hidden'}}></i>
              <img src={profile_picture} alt={username}></img> 
            </div>

            <div className ='Dashboard__Stats__Data'>        
              <h5>@{username}</h5>
              <h2>{name}</h2>
              <p>{biography}</p>
              <h4>Followers: {follower_count}</h4>
              <h4>Following: {following_count} </h4>
              <h5>Estimated earnings per post: ${costPerPost}</h5> 
            </div> 
          </div>

        </div>

        <div className="Dashboard__Body">
         
        </div>
      
            
  
      </div>
    ); 
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  }
}
export default connect(mapStateToProps, {fetchUser})(Dashboard)