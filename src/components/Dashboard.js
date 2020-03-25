import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import { fetchUser, toggleChart } from '../actions'; 
import Spinner from './Spinner'; 
import DisplayChart from './DisplayChart'; 
import GrowthChart from './GrowthChart'; 
import { numFormatter } from '../helpers'; 

class Dashboard extends Component {
  constructor () {
    super(); 
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault(); 
    this.props.fetchUser(this.state.value);
    this.props.toggleChart(this.props.dropDown);
    this.setState({value: ''});
  }

  handleChange (event) {
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
        following_count, engagement_rate, media_count} = this.props.user.profile
  
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
       
      <main className="bg-white rounded-lg">
        <form onSubmit={this.handleSubmit} className="rounded-lg Dashboard__Form">
          <input onChange={this.handleChange} type="text" value={this.state.value} className="form-control rounded-lg" placeholder="Search instagram"/>
        </form>
  
        {/* Image and Stats Row */}
        <div className="row p-3">
  
          {/* Image Col */}
          <div className="col-3 d-flex align-items-center">
            <img className="img-fluid rounded-circle" src={profile_picture} alt={username}></img> 
          </div>
  
          {/* Stats Col */}
          <div className="col-9 ">
  
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
  
            <div className="d-none d-sm-block font-weight-light">{biography}</div>
  
          </div>
  
        </div>
  
        {/* Charts Section */}
        <div className="p-3 p-sm-5 bg-success rounded-lg border-top">
  
          {/* Top Row */}
          <div className="row">
  
            <div className="col-md-4 pb-3">
              <div className="bg-white text-dark card border-0">
                <div className="card-body p-3 d-flex flex-column">
                  <p className="font-weight-bold">Earnings</p>
                  <p className="text-muted">Estimated earnings per post</p> 
                  <span className="h2 align-self-center">${numFormatter(costPerPost)}</span>          
                </div>         
                  <div className="d-none d-md-block">        
                    <DisplayChart type="bar" color='white'/>    
                  </div>      
              </div>
            </div>
  
            <div className="col-md-4 pb-3">
              <div className="bg-white text-dark card border-0">
                <div className="card-body p-3 d-flex flex-column">
                  <p className="font-weight-bold">Engagement Rate</p>
                  <p className="text-muted">Engagement rate per post</p>       
                  <span className="h2 align-self-center">{(engagement_rate * 100).toFixed(2)}%</span>  
                </div>            
                <div className="d-none d-md-block">   
                  <DisplayChart type="area" color='#F44231'/>
                </div>
              </div>
            </div>
  
            <div className="col-md-4 pb-3">
              <div className="bg-white text-dark card border-0">
                <div className="card-body p-3 d-flex flex-column">
                  <p className="font-weight-bold">Average Likes</p>
                  <p className="text-muted">Average likes per post</p>       
                  <span className="h2 align-self-center">{numFormatter(average_likes)}</span>  
                </div>            
                <div className="d-none d-md-block">   
                  <DisplayChart type="area" color='#F44231'/>
                </div>
              </div>
            </div>
          </div>
  
          {/* Bottom Row  */}
          <div className="row">
  
            <div className="col-md-4 pb-3">
              <div className="bg-white text-dark card border-0">
                <div className="card-body p-3 d-flex flex-column">
                  <p className="font-weight-bold">Comments</p>
                  <p className="text-muted">Average comments per post</p> 
                  <span className="h2 align-self-center">{numFormatter(average_comments)}</span>    
                </div>    
                <div className="d-none d-md-block">   
                  <DisplayChart type="area" color='#F44231'/>
                </div>
              </div>
            </div>
  
            <div className="col-md-8">
  
              <GrowthChart />
  
            </div>
          </div>
        </div>    
        {/* Chart Section End    */}
          
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