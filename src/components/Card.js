import React, { Fragment } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const Card = ({title, data, rate: {change, value}, icon, wrapperColor}) => {
  let color, arrowIcon, element

  if (value) {
    color = change === 'more' ? '#4bc349' : '#f22c2c'
    arrowIcon = (change === 'more' ? <FaArrowUp style={{ color }} /> : <FaArrowDown style={{ color }} />)
    element = (
      <Fragment>
        <span style={{ marginRight: '.2rem' }}>
          {arrowIcon}
        </span>
        <span style={{ color, fontWeight: 'bold', marginRight: '.5rem' }}>
          {`${value.toFixed(2)}%`}
        </span>
        { `${change} than usual` }
      </Fragment>
    )
  } else {
    element = 'No change'
  }

  return (
    <div className="Card text-dark card border-0">
      <div className="card-body p-4 d-flex flex-column">

        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted">{title}</span>
          <div 
            className="Card__iconWrapper d-flex justify-content-center align-items-center"
            style={{ backgroundColor: wrapperColor }}
          >
            {icon}
          </div>
        </div>
        <p className="my-4 Card__number">{data}</p>
        <p className="text-muted Card__text"> 
          {element}
        </p>
      </div>
    </div>
  )
}

export default Card
