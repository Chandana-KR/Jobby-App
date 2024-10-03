import {Link} from 'react-router-dom'

import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsCard = props => {
  const {jobs} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobs
  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-item-cont">
        <div className="top-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="start-container">
              <FaRegStar className="start-icon" />
              <p className="job-title">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-type-container">
          <div className="location-package-icon-container">
            <IoLocationOutline className="job-icons" />
            <p className="location">{location}</p>
          </div>

          <div className="location-package-icon-container">
            <BsFillBriefcaseFill className="job-icons" />
            <p className="location">{employmentType}</p>
          </div>

          <div className="location-package-icon-container">
            <p className="location">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="description-container">
          <h1 className="job-title">Description</h1>
          <p className="location">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsCard
