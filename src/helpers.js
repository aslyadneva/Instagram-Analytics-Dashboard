export const numFormatter = (num) => {  
  if (num > 999 && num <= 999949) {
    return `${(num / 1000).toFixed(1)}k`;
  }

  if (num > 999949) {
    return `${(num / 1000000).toFixed(1)}m`;
  }  

  return num 
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