import {FETCH_USER, PROCESS_REQUEST, REQUEST_ERROR} from '../actions/types'; 

const INITIAL_STATE = {
  isLoading: false, 
  data: null, 
  requestError: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROCESS_REQUEST:
      return {
        ...state, isLoading: true
      }
   
    case FETCH_USER: 
      const { profile, last_stat, summary } = action.payload; 

      const neededInfo = {
        basic: {
          name: profile.name, 
          username: profile.username, 
          avatar: profile.profile_picture, 
          isPrivate: profile.is_private, 
          isVerified: profile.is_verified, 
          bio: profile.biography, 
          url: profile.external_url, 
        }, 
        currentStats: {
          currFollowers: last_stat.follower_count, 
          currFollowing: last_stat.following_count, 
          currMediaCount: last_stat.media_count, 
          currEngagementRate: last_stat.engagement_rate * 100, 
          currAverageLikes: summary.average_likes, 
          currAverageComments: summary.average_comments,
          currCostPerPost: ((summary.average_likes + summary.average_comments) * 0.025) + (last_stat.follower_count * 0.0025)
        }, 
        prevStats: {
          prevFollowers: last_stat.follower_count - summary.monthly_growth,
          prevAverageLikes: summary.average_likes_previous, 
          prevAverageComments: summary.average_comments_previous, 
          prevEngagementRate: ((summary.average_likes_previous + summary.average_comments_previous) / (last_stat.follower_count - summary.monthly_growth)) * 100,
          prevCostPerPost: ((summary.average_likes_previous + summary.average_comments_previous) * 0.025) + ((last_stat.follower_count - summary.monthly_growth) * 0.0025)
        }, 
        growth: {
          monthly: summary.monthly_growth, 
          daily: summary.daily_growth
        }
      }

      return {
        ...state, isLoading: false, data: neededInfo
      }

    case REQUEST_ERROR: 
      return {
        ...state, isLoading: false, requestError: action.payload
      }
   
    default: 
      return state; 
  }   
}