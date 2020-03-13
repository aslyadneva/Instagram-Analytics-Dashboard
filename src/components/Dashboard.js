import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import {fetchUser} from '../actions'; 
import Spinner from './Spinner'; 

class Dashboard extends Component {
  componentDidMount () {
    this.props.fetchUser(this.props.match.params.username); 
  }

  numFormatter = (num) => {  
      if (num > 999 && num <= 999949) {
        return `${(num / 1000).toFixed(1)}k`;
      }
    
      if (num > 999949) {
        return `${(num / 1000000).toFixed(1)}m`;
      }  
    
      return num 
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
      following_count, engagement_rate} = this.props.user.profile

      const {average_likes, average_comments} = this.props.user.summary; 

      const costPerPost = (((average_likes+average_comments) * 0.025) + (follower_count * 0.0025)).toFixed(2)


    return (
      <div className="Dashboard ">
  
        <div className="Dashboard__Header">
          <i className="fab fa-instagram"></i>
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
              <h4>Followers: {this.numFormatter(follower_count)}</h4>
              <h4>Following: {this.numFormatter(following_count)} </h4>
              
            </div> 
          </div>

        </div>

        <div className="Dashboard__Body">

          <div className="Dashboard__Card">
            <div className="Dashboard__Card__Icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div>
              <p>Estimated earnings</p> 
              <h2>$ {costPerPost}</h2>
            </div>      
            <p>Per post</p>
          </div>

          <div className="Dashboard__Card">
            <div className="Dashboard__Card__Icon">
              <i className="fas fa-heart"></i>
            </div>
            <div>
              <p>Engagement Rate</p> 
              <h2>% {(engagement_rate * 100).toFixed(2)}</h2>
            </div>      
            <p></p>
          </div>

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