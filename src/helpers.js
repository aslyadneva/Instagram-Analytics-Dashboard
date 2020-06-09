export const numFormatter = num => {  
  if (num > 999 && num <= 999949) {
    return `${(num / 1000).toFixed(1)}k`;
  }

  if (num > 999949) {
    return `${(num / 1000000).toFixed(1)}m`;
  }  

  return num.toFixed()
}


export const dateFormatter = (timeFrame) => {
  const getPrevDay = () => {
    // if the day is 0 that means need to the get the last day of the the previous month 

    let prevMonth; // will be obj 

    if (!months[today.getMonth() - 1].month) {
      prevMonth = months[months.length - 1]
      previousMonth = prevMonth.month;
    } else {
      prevMonth = months[today.getMonth() - 1].month
    }
    return prevMonth
  }

  const months = [
    {month:'Jan', days: 31}, {month:'Feb', days: 28}, {month: 'Mar', days: 31}, 
    {month: 'Apr', days: 30}, {month: 'May', days: 31}, {month: 'Jun', days: 30}, 
    {month: 'Jul', days: 31}, {month: 'Aug', days: 31}, {month: 'Sep', days: 30}, 
    {month: 'Oct', days: 31}, {month: 'Nov', days: 30}, {month: 'Dec', days: 31}
  ]

  const today = new Date(); 
  
  let previousMonth; 
  let currentDate; 
  let previousDate;

  if (timeFrame === "Monthly") {    
    // ex. Month ---  Mar
    currentDate = `${months[today.getMonth()].month}`
    previousDate = `${ months[today.getMonth() - 1].month ? months[today.getMonth() - 1].month : 'Dec' }`; 
  } 
  
  else if (timeFrame === "Daily") {
    // ex. Day and Month ---  25 Mar
    currentDate = `${ today.getDate() } ${ months[today.getMonth()].month }`;
    previousDate = `${ 
        today.getDate() - 1 ? today.getDate() - 1 : getPrevDay().days} ${ previousMonth ? previousMonth : months[today.getMonth()].month 
      }`;  
  }

  return [previousDate, currentDate]
}

export const getRateDiff = (currRate, prevRate) => {
  console.log(currRate, prevRate)

  //get percentage value 
  let percent = (currRate/prevRate) * 100

  // if 'percent' is more than a 100, it means there was an increase from the previous value
  if (percent > 100) {
    // subtract from 100 to get the value of by HOW MUCH the current value increased 
    return {
      change: 'more', 
      value: percent - 100
    }
    
  }

  // if 'percent' is less than a 100, it means there was an DECREASE from the previous value
  if (percent < 100) {
    // get the value of by HOW MUCH it decreased compared to the before value 
    return {
      change: 'less',
      value: 100 - percent 
    }
  }

  // if 'percent' is equal to 100, there was no change from previous value
  if (percent === 100) {
    return null
  }
}

























// const growthDifference = (current, previous) => {
      //   let percentage = Math.round(100 - ((current/previous) * 100))
      //   if (current < previous) {
      //     return percentage * (-1)
      //   } else if (current > previous) {
      //     return percentage
      //   }
      // }

      // const differenceDisplay = (currentVal, previousVal) => {
      //   let growth = growthDifference(currentVal, previousVal);
      //   if (Math.sign(growth) === 1) {
      //     return (
      //       <p className="text-muted mb-0" style={{fontSize: '0.8rem'}}>
      //         <span style={{color: 'green'}} className="mr-2">
      //           <i className="fas fa-long-arrow-alt-up mr-1" />
      //           {growth}%
      //         </span> 
      //         More than last {dropDown === "Daily" ? 'day' : 'month'}
      //       </p> 
      //     );
      //   }

      //   return (
      //     <p className="text-muted mb-0" style={{fontSize: '0.8rem'}}>
      //       <span style={{color: 'red'}} className="mr-2">
      //         <i className="fas fa-long-arrow-alt-down mr-1" /> 
      //         {growth}%
      //       </span >
      //       Less than last {dropDown === "Daily" ? 'day' : 'month'}
      //     </p>
      //   ); 
      // }