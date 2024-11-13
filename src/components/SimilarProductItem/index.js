import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarProductItem = props => {
  const {similarJobItem} = props
  const {companyLogoUrl, title, rating, location} = similarJobItem
  const {employmentType, packagePerAnnum} = similarJobItem
  const {jobDescription} = similarJobItem
  console.log('similar Products')
  console.log(similarJobItem)
  return (
    <li className="each-job-item-container">
      <div className="top-container">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="similar job company logo"
        />
        <div className="title-container">
          <h1 className="job-title">{title}</h1>
          <div className="start-container">
            <FaRegStar className="start-icon" />
            <p className="job-title"> {rating}</p>
          </div>
        </div>
      </div>
      <div className="location-package-type-container">
        <div className="location-package-icon-container">
          <IoLocationOutline className="job-icons" />
          <p className="location"> {location}</p>
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

      <h1 className="job-title">Description</h1>
      <p className="location">{jobDescription}</p>
    </li>
  )
}
export default SimilarProductItem
