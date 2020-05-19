import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'; 
import { fetchUser, toggleChart } from '../actions'; 
import Spinner from './Spinner'; 
import DisplayChart from './DisplayChart'; 
import GrowthChart from './GrowthChart'; 
import { numFormatter } from '../helpers'; 

class Dashboard extends Component {
  state = {value: ''}

  handleSubmit = (event) => {
    event.preventDefault(); 
    this.props.fetchUser(this.state.value);
    this.props.toggleChart(this.props.dropDown);
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
          average_comments, 
          daily_growth, 
          daily_growth_previous, 
          monthly_growth, 
          monthly_growth_previous
        } = this.props.user.summary; 
  
        const costPerPost = (((average_likes+average_comments) * 0.025) + (follower_count * 0.0025)).toFixed(2); 
  
      return (
       
      <main className="Dashboard">
        <form onSubmit={this.handleSubmit} className="rounded-lg Dashboard__Form">
          <input onChange={this.handleChange} type="text" value={this.state.value} className="Dashboard__input form-control" placeholder="Search instagram"/>
        </form>
  
        {/* Image and Stats Row */}
        <div className="Dashboard__stats p-3 p-sm-5">
  
          {/* Image Col */}
          <div className="Dashboard__stats__image pl-0 d-flex align-items-center">
            <img className="Dashboard__avatar img-fluid rounded-circle w-75" src={profile_picture} alt={username}></img> 
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
        <div className="Dashboard__graphs p-3 px-sm-5 pt-sm-0 pb-sm-5 rounded-lg">
          {is_private ? <h4 style={{textAlign: 'center'}}><i className="fas fa-lock"/> This account is private</h4> : 
          (
            <Fragment>
            {/* Top Row */}
            <div className="row">
            
                <div className="col-md-4 pb-3 pb-md-4">
                  <div className="Dashboard__card text-dark card border-0">
                    <div className="card-body p-3 d-flex flex-column">
                      <p className="font-weight-bold">Earnings</p>
                      <p className="text-muted">Estimated earnings per post</p> 
                      <span className="h2 align-self-center">${numFormatter(costPerPost)}</span>          
                    </div>         
                      <div className="d-none d-md-block">        
                        <DisplayChart type="bar" color='#6454F0'/>    
                      </div>      
                  </div>
                </div>
    
                <div className="col-md-4 pb-3">
                  <div className="Dashboard__card text-dark card border-0">
                    <div className="card-body p-3 d-flex flex-column">
                      <p className="font-weight-bold">Engagement Rate</p>
                      <p className="text-muted">Engagement rate per post</p>       
                      <span className="h2 align-self-center">{(engagement_rate * 100).toFixed(2)}%</span>  
                    </div>            
                    <div className="d-none d-md-block">   
                      <DisplayChart type="area" color='#3499FF'/>
                    </div>
                  </div>
                </div>
    
                <div className="col-md-4 pb-3">
                  <div className="Dashboard__card text-dark card border-0">
                    <div className="card-body p-3 d-flex flex-column">
                      <p className="font-weight-bold">Average Likes</p>
                      <p className="text-muted">Average likes per post</p>       
                      <span className="h2 align-self-center">{numFormatter(average_likes)}</span>  
                    </div>            
                    <div className="d-none d-md-block">   
                      <DisplayChart type="area" color='#64EBDE'/>
                    </div>
                  </div>
                </div>
              </div>
              {/* Top Row End */}
    
              {/* Bottom Row  */}
              <div className="row">
                <div className="col-md-4 pb-3 pb-md-0">
                  <div className="Dashboard__card h-100 text-dark card border-0">
                    <div className="card-body p-3 d-flex flex-column">
                      <p className="font-weight-bold">Comments</p>
                      <p className="text-muted">Average comments per post</p> 
                      <span className="h2 align-self-center">{numFormatter(average_comments)}</span>    
                    </div>    
                    <div className="d-none d-md-block">   
                      <DisplayChart type="area" color='#0088BA'/>
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
export default connect(mapStateToProps, { fetchUser, toggleChart })(Dashboard)