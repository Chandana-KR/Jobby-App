import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import JobsCard from '../JobsCard'
import FilterDetails from '../FilterDetails'
import SalaryRangeFilter from '../SalaryRangeFilter'
import ProfileDetails from '../ProfileDetails'
import Location from '../Location'

import './index.css'

const apiResultStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationList = [
  {
    locationId: 'DELHI',
    label: 'Delhi',
  },
  {
    locationId: 'BANGALORE',
    label: 'Bangalore',
  },
  {
    locationId: 'HYDERABAD',
    label: 'Hyderabad',
  },
  {
    locationId: 'MUMBAI',
    label: 'Mumbai',
  },
  {
    locationId: 'CHENNAI',
    label: 'Chennai',
  },
]

class AllJobsSection extends Component {
  state = {
    jobsArray: [],
    apiStatus: apiResultStatus.initial,
    searchInput: '',
    activeEmployee: [],
    salaryRange: '',
    activeLocation: '',
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  searchInputValue = event => {
    if (event.key === 'Enter') {
      this.setState({searchInput: event.target.value}, this.getJobsDetails)
    }
  }

  changeEmploymentType = id => {
    this.setState(prevState => {
      const isActive = prevState.activeEmployee.includes(id)
      const updatedActiveEmployees = isActive
        ? prevState.activeEmployee.filter(employeeId => employeeId !== id)
        : [...prevState.activeEmployee, id]

      return {activeEmployee: updatedActiveEmployees}
    }, this.getJobsDetails)
  }

  changeSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobsDetails)
  }

  getJobsDetails = async () => {
    const {searchInput, activeEmployee, salaryRange} = this.state

    // const {activeLocation} = this.state

    const employmentType = activeEmployee.join(',')
    console.log('This is employ type')
    console.log(employmentType)
    console.log(typeof employmentType)
    const token = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${employmentType}&minimum_package=${salaryRange}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobs = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsArray: updatedJobs,
        apiStatus: apiResultStatus.success,
      })
    } else {
      this.setState({apiStatus: apiResultStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getJobsDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="job-failure-button"
        onClick={this.onRetry}
      >
        Retry
      </button>
    </div>
  )

  changeLocation = activeId => {
    this.setState({activeLocation: activeId})
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-desc">
        We could not find any jobs.Try other filters.
      </p>
    </div>
  )

  renderSuccess = () => {
    const {jobsArray, activeLocation} = this.state
    const isTrue = jobsArray.length > 0

    const updatedJobsArray = jobsArray.filter(
      eachJob => eachJob.location === activeLocation,
    )
    const jobs = activeLocation === '' ? jobsArray : updatedJobsArray
    console.log(updatedJobsArray)
    return (
      <ul className="jobs-item-container">
        {isTrue
          ? jobs.map(eachJob => <JobsCard jobs={eachJob} key={eachJob.id} />)
          : this.renderNoJobsView()}
      </ul>
    )
  }

  renderViewBasedOnJobStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResultStatus.success:
        return this.renderSuccess()
      case apiResultStatus.failure:
        return this.renderFailureView()
      case apiResultStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderSearchInput = () => (
    <>
      <input
        type="search"
        placeholder="Search"
        className="search-input"
        onKeyDown={this.searchInputValue}
      />
      <button
        type="button"
        data-testid="searchButton"
        className="search-button"
        aria-label="search button"
      >
        <BsSearch className="search-icon" />
      </button>
    </>
  )

  render() {
    const {salaryRange} = this.state
    return (
      <div className="jobs-container">
        <div className="profile-employee-salary-container">
          <div className="search-container">{this.renderSearchInput()}</div>
          <ProfileDetails />
          <h1 className="filter-heading">Type of Employment</h1>
          <ul className="employee-salary-container">
            {employmentTypesList.map(eachType => (
              <FilterDetails
                employmentTypesList={eachType}
                key={eachType.employmentTypeId}
                changeEmploymentType={this.changeEmploymentType}
              />
            ))}
          </ul>

          <h1 className="filter-heading">Salary Range</h1>
          <ul className="employee-salary-container">
            {salaryRangesList.map(eachrange => (
              <SalaryRangeFilter
                salaryRangesList={eachrange}
                key={eachrange.salaryRangeId}
                changeSalaryRange={this.changeSalaryRange}
                salaryRange={salaryRange}
              />
            ))}
          </ul>

          <h1 className="filter-heading">Location</h1>
          <ul>
            {locationList.map(eachLocation => (
              <Location
                locationItem={eachLocation}
                key={eachLocation.locationId}
                changeLocation={this.changeLocation}
              />
            ))}
          </ul>
        </div>
        <div className="jobs-input-container">
          <div className="search-container-large">
            {this.renderSearchInput()}
          </div>
          {this.renderViewBasedOnJobStatus()}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
