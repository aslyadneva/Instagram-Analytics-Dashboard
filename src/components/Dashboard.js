import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'; 
import { fetchUser } from '../actions'; 
import Spinner from './Spinner'; 
import GrowthChart from './GrowthChart'; 
import { numFormatter } from '../helpers'; 
import { FaDollarSign, FaFire, FaHeart, FaComment, FaInstagram } from 'react-icons/fa'

class Dashboard extends Component {
  state = {value: ''}

  handleSubmit = (event) => {
    event.preventDefault(); 
    this.props.fetchUser(this.state.value);
    this.setState({value: ''});
  }

  handleChange = (event)=> {
    this.setState({value: event.target.value})
  }

  componentDidMount () {
    this.props.fetchUser(this.props.match.params.username); 
  }

  render () {
    if (!this.props.isLoading && !this.props.user) {
      return (<Spinner/>)
    } else if (this.props.isLoading && !this.props.user) {
      return (<Spinner/>)
    } else if (this.props.isLoading && this.props.user) {
      return (<Spinner/>)
    } else if (!this.props.isLoading && this.props.user){
      const { 
        name, 
        username, 
        profile_picture, 
        is_verified, 
        biography, 
        follower_count, 
        following_count, 
        engagement_rate, 
        media_count, 
        external_url,
        is_private
      } = this.props.user.profile
  
        const {
          average_likes, 
          average_likes_previous,
          average_comments, 
          average_comments_previous,
          daily_growth, 
          daily_growth_previous, 
          monthly_growth, 
          monthly_growth_previous
        } = this.props.user.summary; 
        
        const costPerPostPrev = (((average_likes_previous + average_comments_previous) * 0.025) + ((follower_count - monthly_growth) * 0.0025)).toFixed(2); 
        const costPerPost = (((average_likes + average_comments) * 0.025) + (follower_count * 0.0025)).toFixed(2); 
  
      return (
       
      <main className="Dashboard">
        <form onSubmit={this.handleSubmit} className="rounded-lg px-3 py-2 Dashboard__form">
            <FaInstagram className="Dashboard__form__logo" style={{fontSize: '1.5rem'}}/>
          <input onChange={this.handleChange} type="text" value={this.state.value} className="Dashboard__input form-control" placeholder="Search instagram"/>
        </form>
  
        {/* Image and Stats Row */}
        <div className="Dashboard__stats px-3 py-4 px-sm-5">
  
          {/* Image Col */}
          <div className="Dashboard__stats__image">
            <img className="Dashboard__avatar rounded-circle" src={profile_picture} alt={username}></img> 
          </div>
  
          {/* Stats Col */}
          <div className="Dashboard__stats__description">
  
            <div className="mb-3">
              <div className=" font-weight-bold mb-0">
                {username}
                <i className="fas fa-check-circle fa-lg ml-2 text-primary" style={{visibility: is_verified? 'visible': 'hidden'}}/>
              </div>
              <div className="text-muted">{name}</div>
            </div>
  
            <div className="d-flex">
              <div className="mr-3">
                <span className="font-weight-bold">{numFormatter(media_count)}</span> 
                <span className="text-muted d-block">Posts</span>
              </div>
  
              <div className="mr-3">
                <span className="font-weight-bold">{numFormatter(follower_count)}</span> 
                <span className="text-muted d-block">Followers</span>
              </div>
  
              <div>
                <span className="font-weight-bold">{numFormatter(following_count)}</span> 
                <span className="text-muted d-block">Following</span>
              </div>  
            </div>
  
            <div className="d-none d-sm-block mt-3 font-weight-light">{biography}</div>
            <a href={external_url} className="d-none d-sm-block mt-1 font-weight-light">{external_url}</a>
  
          </div>
  
        </div>
  
        {/* Charts Section */}
        <div className="Dashboard__graphs p-3 px-sm-5 pt-sm-5 pb-sm-5 rounded-lg">
          {is_private ? <h4 style={{textAlign: 'center'}}><i className="fas fa-lock"/> This account is private</h4> : 
          (
            <Fragment>
            {/* Top Row */}
            <div className="row">
            
                <div className="col-md-4 pb-3 pb-md-4">
                  <div className="Card text-dark card border-0">
                    <div className="card-body p-4 d-flex flex-column">

                      <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Estimated earnings per post</span> 
                        <div className="Card__iconWrapper d-flex justify-content-center align-items-center">
                          <FaDollarSign style={{ color: '#c73aa9'}}/>
                        </div>             
                      </div>
                      <p className="my-4 Card__number">${numFormatter(costPerPost)}</p>   
                      <p className="text-muted Card__text">Something posts than usual</p>  

                    </div>         
                  </div>
                </div>
    
                <div className="col-md-4 pb-3">
                  <div className="Card text-dark card border-0">
                    <div className="card-body p-4 d-flex flex-column">

                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Engagement Rate</span>
                        <div 
                          className="Card__iconWrapper d-flex justify-content-center align-items-center" 
                          style={{ backgroundColor: '#fff6da'}}
                        >
                          <FaFire style={{ color: '#fdbd02' }} />
                        </div>
                      </div>
                      <p className="my-4 Card__number">{(engagement_rate * 100).toFixed(2)}%</p>
                      <p className="text-muted Card__text">Something posts than usual</p>  

                    

                    </div>            
                  </div>
                </div>
    
                <div className="col-md-4 pb-3">
                  <div className="Card text-dark card border-0">
                    <div className="card-body p-4 d-flex flex-column">

                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted">Average Likes</span>
                            <div
                              className="Card__iconWrapper d-flex justify-content-center align-items-center"
                              style={{ backgroundColor: '#fddfdf' }}
                            >
                              <FaHeart style={{ color: '#f22c2c' }} />
                            </div>
                          </div>
                          <p className="my-4 Card__number">{numFormatter(average_likes)}</p>
                          <p className="text-muted Card__text">Something posts than usual</p>  

                    </div>            
                  </div>
                </div>
              </div>
              {/* Top Row End */}
    
              {/* Bottom Row  */}
              <div className="row">
                <div className="col-md-4 pb-3 pb-md-0">
                  <div className="Card text-dark card border-0">
                    <div className="card-body p-4 d-flex flex-column">

                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted">Average Comments</span>
                            <div
                              className="Card__iconWrapper d-flex justify-content-center align-items-center"
                              style={{
                                backgroundColor: '#eeebff' }}
                            >
                              <FaComment style={{ color: '#8e78ee' }} />
                            </div>
                          </div>
                          <p className="my-4 Card__number">{numFormatter(average_comments)}</p>
                          <p className="text-muted Card__text">Something posts than usual</p>  
                    </div>    
                  </div>
                </div>
    
                <div className="col-md-8">
                  <GrowthChart />
                </div>          
              </div>
              {/* Bottom Row End*/}
          </Fragment> 
          )
          }        
        </div>
          
      </main>          
      ); 
    }    
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data, 
    isLoading: state.user.isLoading, 
    dropDown: state.dropDown
  }
}
export default connect(mapStateToProps, { fetchUser })(Dashboard)