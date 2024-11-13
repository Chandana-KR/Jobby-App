import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import Skills from '../Skills'
import Header from '../Header'

import './index.css'

const jobApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    skills: [],
    similarJobs: [],
    jobStatus: jobApiStatus.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({jobStatus: jobApiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const update = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtDesc: data.job_details.life_at_company.description,
        imageLifeAt: data.job_details.life_at_company.image_url,
      }
      const skillForJob = data.job_details.skills.map(each => ({
        name: each.name,
        imageSkill: each.image_url,
        id: each.name,
      }))
      const similarJobsList = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log('Similar Jobs in api')
      console.log(similarJobsList)
      this.setState({
        jobItemDetails: update,
        skills: skillForJob,
        similarJobs: similarJobsList,
        jobStatus: jobApiStatus.success,
      })
    } else {
      this.setState({jobStatus: jobApiStatus.failure})
    }
  }

  renderSimilarJobs = () => {
    const {jobItemDetails} = this.state
    const {similarJobs = []} = jobItemDetails
    const updatedSimilarJobs = similarJobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    console.log('Similar Jobs')
    console.log(updatedSimilarJobs)

    return updatedSimilarJobs.map(eachItem => (
      <SimilarProductItem updatedSimilarJobs={eachItem} key={eachItem.id} />
    ))
  }

  onClickRetry = () => {
    this.getJobItemDetails()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-items-failure-image"
      />
      <h1 className="jobs-item-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-item-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-failure-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobSuccessView = () => {
    const {jobItemDetails, skills, similarJobs} = this.state
    const {companyLogoUrl, employmentType, jobDescription} = jobItemDetails
    const {location, packagePerAnnum, rating, title} = jobItemDetails
    const {lifeAtDesc, imageLifeAt, companyWebsiteUrl} = jobItemDetails
    console.log(title)
    return (
      <div className="job-similar-container">
        <div className="job-item-container">
          <div className="top-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company logo"
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

          <div className="anchor-item">
            <h1 className="job-title">Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
          </div>
          <p className="location">{jobDescription}</p>

          <div className="skills-container">
            <h1 className="job-title">Skills</h1>
            <ul className="skills-list-container">
              {skills.map(eachSkill => (
                <Skills skill={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
            <div className="life-at-company-container">
              <h1 className="job-title">Life at Company</h1>
              <div className="life-at-container">
                <p className="job-title">{lifeAtDesc}</p>
                <img
                  className="compaly-image"
                  src={imageLifeAt}
                  alt="life at company"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="similar-product-container">
          <h1 className="job-title">Similar Jobs</h1>
          <ul className="each-job-item">
            {similarJobs.map(eachJob => (
              <SimilarProductItem similarJobItem={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderStatusBasedView = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case jobApiStatus.success:
        return this.renderJobSuccessView()
      case jobApiStatus.failure:
        return this.renderJobFailureView()
      case jobApiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-header-container">
        <Header />
        {this.renderJobSuccessView()}
      </div>
    )
  }
}

export default JobItemDetails
