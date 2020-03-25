import axios from 'axios'; 
import history from '../history'; 
import {FETCH_USER, PROCESS_REQUEST, TOGGLE_CHART } from './types'; 


function processRequest () {
  return {
    type: PROCESS_REQUEST
  }
}

export function fetchUser (query) { 

  return async function (dispatch) {

    dispatch(processRequest()); 

    const userResults = await axios.get(`https://igblade.com/api/v2/accounts/${query}`, {
      headers: {
        "Authorization": "Bearer OmxCZ6mHvk8WOjfekProE5BAtCBB7pC3mVZUBFvQi6J58Gqz5ofAZi7KMXvM"
      }
    }); 

    dispatch({ type: FETCH_USER, payload: userResults.data }) 
    history.push(`/${query}`)
  }
}

export function toggleChart (type) {
  return {
    type: TOGGLE_CHART,
    payload: type
  }
}