import React from 'react'; 
import Chart from "react-apexcharts";

class DisplayChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
      options: {
        dataLabels: {
          enabled: false,
        },
        colors:[this.props.color],
        grid: {
          show: false, 
          padding: {
            left: 0, 
            right: 0
          },
        },
        tooltip: {
          enabled: false
        },
        chart: {
          id: "basic-bar", 
          sparkline: {
            enabled: true
          }, 
          toolbar: {
            show: false
          }, 
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998], 
          labels: {
            show: false
          }, 
          axisTicks: {
            show: false
          },
        }, 
        yaxis: {
          labels: {
            show: false
          }
        }
      },

      series: [
        {
          name: "series-1",
          data: [45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  render () {
    return (
        <Chart
          options={this.state.options}
          series={this.state.series}
          type={this.props.type}
          height= '60'
        />
    )
  }
  
}

export default DisplayChart; 
