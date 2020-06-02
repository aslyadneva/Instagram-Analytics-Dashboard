import React from 'react'; 
import Chart from "react-apexcharts";
import { connect } from 'react-redux'; 
import { toggleChart } from '../actions'; 
import { numFormatter, dateFormatter } from '../helpers'; 

class GrowthChart extends React.Component {
  
  constructor(props) {
    super(props); 

    this.state = {
      options: {
        dataLabels: {
          enabled: false,
        },
        colors: ['#0087fe'],
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 1,
            opacityTo: 1,
          }
        }, 
        grid: {
          show: false, 
          padding: {
            left: 0, 
            right: 0
          }
        },
        tooltip: {
          enabled: false
        },
        chart: {
          id: "line", 
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: dateFormatter('Monthly')
        }, 
        yaxis: {
          labels: {
            offsetX: -15,
            offsetY: 0,
            formatter: function(val, index) {
              return numFormatter(val);
            }
          }
        }
      },

      series: [ 
        {
          name: "series-1", 
          data: [this.props.user.profile.follower_count - this.props.user.summary.daily_growth, this.props.user.profile.follower_count] 
        } 
      ]
    }  
  }

  handleClick = (timeFrame, currentFollowers, dailyGrowth, monthlyGrowth) => {
    this.props.toggleChart(timeFrame); 

    if (timeFrame === "Daily") {
      this.setState({ 
        series: [{name: "series-1", data: [currentFollowers - monthlyGrowth, currentFollowers]}], 
        options: {...this.state.options, xaxis: { categories: dateFormatter('Daily') }}
      });     
    } 
    
    else {
      this.setState({ 
        series: [ { name: "series-1", data: [currentFollowers - dailyGrowth, currentFollowers] } ],
        options: {...this.state.options, xaxis: { categories: dateFormatter('Monthly') }}
       })
    }    
  }

  render () {
    const { dropDown } = this.props; 
    const { follower_count } = this.props.user.profile;
    const { daily_growth, monthly_growth } = this.props.user.summary;
    
    return (
      <div className="Card text-dark card border-0">

        <div className="card-body pt-3 pb-0 px-3 d-flex flex-column">
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
        </div>  

        <div className="px-3">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type='area'
            height= '200'
          />  
        </div>          
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
