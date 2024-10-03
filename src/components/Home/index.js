import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs.salary <br /> information,
            company reviews.Find the job that fits your <br /> ability and
            potential
          </p>
          <Link to="/jobs" className="link">
            <button type="button" className="find-jobs">
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}

export default Home
