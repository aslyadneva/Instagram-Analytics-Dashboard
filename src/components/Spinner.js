import React, {Fragment} from 'react'; 

const Spinner = () => {
  return (
    <Fragment>
      <h3 className="Spinner__Title">ANALYZING...</h3>
      <div className="lds-ring">
        <div></div><div></div><div></div><div></div>
      </div>
    </Fragment>
  ); 
}

export default Spinner; 