import {Component} from 'react'

import Header from '../Header'

import AllJobsSection from '../AllJobsSection'

import './index.css'

class Jobs extends Component {
  render() {
    return (
      <>
        <Header />

        <AllJobsSection />
      </>
    )
  }
}

export default Jobs
