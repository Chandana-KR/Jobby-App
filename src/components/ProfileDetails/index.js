import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const profileApiState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {
    profileDetailsState: profileApiState.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(profileApiUrl, option)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileDetailsState: profileApiState.success,
      })
    } else {
      this.setState({profileDetailsState: profileApiState.failure})
    }
  }

  onClickRetry = () => {
    this.getProfileDetails()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <button type="button" className="retry-button" onClick={this.onClickRetry}>
      Retry
    </button>
  )

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, shortBio, name} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderViewBasedOnStatus = () => {
    const {profileDetailsState} = this.state
    switch (profileDetailsState) {
      case profileApiState.success:
        return this.renderSuccessView()
      case profileApiState.failure:
        return this.renderFailureView()
      case profileApiState.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderViewBasedOnStatus()}</div>
  }
}

export default ProfileDetails
