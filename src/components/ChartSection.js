import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Card from './Card'
import GrowthChart from './GrowthChart'; 
import { FaDollarSign, FaFire, FaHeart, FaComment } from 'react-icons/fa'
import { numFormatter, getRateDiff } from '../helpers'; 

const ChartSection = ({ 
  user: { basic: { isPrivate }, 
  currentStats: { currCostPerPost, currEngagementRate, currAverageLikes, currAverageComments}, 
  prevStats: { prevCostPerPost, prevEngagementRate, prevAverageLikes, prevAverageComments}}
}) => {
  return (
    <div className="Dashboard__graphs p-3 px-sm-5 pt-sm-5 pb-sm-5 rounded-lg">
      {isPrivate ? <h4 style={{ textAlign: 'center' }}><i className="fas fa-lock" /> This account is private</h4> :
        (
          <Fragment>
            <div className="row">
              <div className="col-md-6 col-xl-4 pb-3 pb-md-4">
                <Card
                  title="Estimated earnings per post"
                  data={`$${numFormatter(currCostPerPost)}`}
                  rate={getRateDiff(currCostPerPost, prevCostPerPost)}
                  icon={<FaDollarSign style={{ color: '#c73aa9' }} />}
                  wrapperColor='#f9e1f2'
                />
              </div>
              <div className="col-md-6 col-xl-4 pb-3">
                <Card
                  title="Engagement Rate"
                  data={`${currEngagementRate.toFixed(2)}%`}
                  rate={getRateDiff(currEngagementRate, prevEngagementRate)}
                  icon={<FaFire style={{ color: '#fdbd02' }} />}
                  wrapperColor='#fff6da'
                />
              </div>
              <div className="col-md-6 col-xl-4 pb-3">
                <Card
                  title="Average Likes"
                  data={numFormatter(currAverageLikes)}
                  rate={getRateDiff(currAverageLikes, prevAverageLikes)}
                  icon={<FaHeart style={{ color: '#f22c2c' }} />}
                  wrapperColor='#fddfdf'
                />
              </div>
              <div className="col-md-6 col-xl-4 pb-md-0">
                  <Card
                    title="Average Comments"
                    data={numFormatter(currAverageComments)}
                    rate={getRateDiff(currAverageComments, prevAverageComments)}
                    icon={<FaComment style={{ color: '#8e78ee' }} />}
                    wrapperColor='#eeebff'
                  />
                </div>
              <div className="col-xl-8">
                <GrowthChart />
              </div>
            </div>
          </Fragment>
        )
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  }
}

export default connect(mapStateToProps)(ChartSection)
