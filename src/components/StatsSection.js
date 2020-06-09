import React from 'react'
import { connect } from 'react-redux' 
import { numFormatter } from '../helpers'; 
import { FaCheckCircle } from 'react-icons/fa';
 
const StatsSection = ({ user: { basic: { avatar, username, isVerified, name, bio, url }, currentStats: { currMediaCount, currFollowers, currFollowing}} }) => {

  return (
    <div className="Dashboard__stats px-3 py-4 px-sm-5">
      {/* Image Col */}
      <div className="Dashboard__stats__image">
        <img className="Dashboard__avatar rounded-circle" src={avatar} alt={username}></img>
      </div>
    {/* Stats Col */}
      <div className="Dashboard__stats__description">
        <div className="mb-3">
          <div className=" font-weight-bold mb-0">
            {username}
            <FaCheckCircle className="fas fa-check-circle fa-lg ml-2 text-primary" style={{ visibility: isVerified ? 'visible' : 'hidden' }} />
          </div>
          <div className="text-muted">{name}</div>
        </div>

        <div className="d-flex">
          <div className="mr-3">
            <span className="font-weight-bold">{numFormatter(currMediaCount)}</span>
            <span className="text-muted d-block">Posts</span>
          </div>

          <div className="mr-3">
            <span className="font-weight-bold">{numFormatter(currFollowers)}</span>
            <span className="text-muted d-block">Followers</span>
          </div>

          <div>
            <span className="font-weight-bold">{numFormatter(currFollowing)}</span>
            <span className="text-muted d-block">Following</span>
          </div>
        </div>

        <div className="d-none d-sm-block mt-3 font-weight-light">{bio}</div>

        <a href={url} target="_blank" rel="noopener noreferrer" className="d-none d-sm-block mt-1 font-weight-light">{url}</a>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  }
}

export default connect(mapStateToProps)(StatsSection)
