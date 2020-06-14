import React from 'react'; 

const Spinner = () => {
  return (
    <div className="Spinner d-flex flex-column justify-content-center">
      <h3 className="Spinner__Title mb-3 align-self-center">LOADING</h3>
      <div className="lds-ring align-self-center">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  ); 
}

export default Spinner; 