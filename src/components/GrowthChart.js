import React from 'react'; 
import Chart from "react-apexcharts";
import { connect } from 'react-redux'; 
import { toggleChart } from '../actions'; 
import { numFormatter } from '../helpers'; 

class GrowthChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "line"
        },
        xaxis: {
          categories: ['previous date', 'current date']
        }
      },
      series: [ {name: "series-1", data: [this.props.user.profile.follower_count - this.props.user.summary.daily_growth, this.props.user.profile.follower_count] } ]
    }  
  }

  handleClick = (timeFrame, currentFollowers, dailyGrowth, monthlyGrowth) => {
    this.props.toggleChart(timeFrame); 

    if (timeFrame === "Daily") {
      this.setState({ series: [{name: "series-1", data: [currentFollowers - monthlyGrowth, currentFollowers]}] }); 
      console.log(currentFollowers - monthlyGrowth); 
    } else {
      this.setState({ series: [ { name: "series-1", data: [currentFollowers - dailyGrowth, currentFollowers] } ] })
      console.log(currentFollowers - dailyGrowth); 
    }    
  }

  render () {
    const { dropDown } = this.props; 
    const { follower_count } = this.props.user.profile;
    const { daily_growth, monthly_growth } = this.props.user.summary;
    
    return (
      <div className="bg-white text-dark card border-0">

        <div className="card-body p-3 d-flex flex-column">

          <div className="d-flex justify-content-between">
            <p className="font-weight-bold">Growth</p>
              <div className="btn-group">
                <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {dropDown}
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button onClick={() => this.handleClick(dropDown, follower_count, daily_growth, monthly_growth)} className="dropdown-item" type="button">{dropDown === "Daily" ? "Monthly" : "Daily"}</button>
                </div>
              </div>
          </div>

          <p className="text-muted">Average {dropDown === "Daily" ? 'daily' : 'monthly'} growth</p> 

          <div className="align-self-center d-flex flex-column">
            <span className="h2 align-self-center mb-0">{dropDown === "Daily" ? numFormatter(daily_growth): numFormatter(monthly_growth)}</span>
            {/* {dropDown === "Daily" ? differenceDisplay(daily_growth, daily_growth_previous) : differenceDisplay(monthly_growth, monthly_growth_previous)} */}
          </div>   

        </div>  

        <Chart
          options={this.state.options}
          series={this.state.series}
          type='area'
          height= '200'
        />            
      </div>      
    )
  }
  
}

const mapStateToProps = state => {
  return {
    user: state.user.data, 
    dropDown: state.dropDown
  }
}

export default connect (mapStateToProps, {toggleChart})(GrowthChart); 
