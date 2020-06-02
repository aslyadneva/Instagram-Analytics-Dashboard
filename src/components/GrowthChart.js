import React from 'react'; 
import Chart from "react-apexcharts";
import { connect } from 'react-redux'; 
import { numFormatter, dateFormatter } from '../helpers'; 

class GrowthChart extends React.Component { 
  constructor(props) {
    super(props); 

    this.state = {
      dropDown: 'Daily',
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
          categories: dateFormatter('Daily') //returns ['1 Jun', '2 Jun'] 
        }, 
        yaxis: {
          labels: {
            offsetX: -15,
            offsetY: 0,
            formatter: function(val, index) {
              return numFormatter(val); // formats long numbers for y-axis values just like the rest of the nums 
            }
          } 
        }
      },

      series: [ 
        { // initial data is for daily growth -- [followers yesterday, follwers today]
          name: "series-1", 
          data: [this.props.user.profile.follower_count - this.props.user.summary.daily_growth, this.props.user.profile.follower_count] 
        } 
      ]
    }  
  }

  handleClick = ({ target: { textContent}}) => {
    const { user: { last_stat: { follower_count }, summary: { daily_growth, monthly_growth}} } = this.props

    // console.log(textContent)
    // console.log(follower_count)
    // console.log(daily_growth)
    // console.log(monthly_growth)

    let growthType = textContent === 'Monthly' ? monthly_growth : daily_growth

    this.setState({ 
      dropDown: textContent,
      series: [{ name: "series-1", data: [follower_count - growthType, follower_count] }],
      options: {...this.state.options, xaxis: { categories: dateFormatter(textContent) }}
    })
  }

  render () {
    const { dropDown } = this.state; 
    
    return (
      <div className="Card text-dark card border-0">

        <div className="card-body pt-3 pb-0 px-3 d-flex flex-column">
          <div className="d-flex justify-content-between">
            <p className="font-weight-bold">Growth</p>

              <div className="btn-group">

                <button 
                  className="btn btn-outline-secondary btn-sm dropdown-toggle" 
                  type="button" 
                  data-toggle="dropdown" 
                  aria-haspopup="true" 
                  aria-expanded="false"
                >
                  {dropDown}
                </button>

                <div className="dropdown-menu dropdown-menu-right">
                  <button 
                    onClick={this.handleClick} className="dropdown-item" 
                    type="button"
                  >
                    {dropDown === "Daily" ? "Monthly" : "Daily"}
                  </button>
                </div>

              </div>

          </div>

          <p className="text-muted">Average {dropDown.toLowerCase()} growth</p> 
        
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
  }
}

export default connect (mapStateToProps)(GrowthChart); 
