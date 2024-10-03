import './index.css'

const FilterDetails = props => {
  const {
    employmentTypesList,

    changeEmploymentType,
  } = props

  const onChangeEmploymentType = activeId => {
    changeEmploymentType(activeId)
  }

  return (
    <li className="salary-range-item-container">
      <input
        type="checkbox"
        className="checkbox"
        id={employmentTypesList.employmentTypeId}
        onChange={() =>
          onChangeEmploymentType(employmentTypesList.employmentTypeId)
        }
      />
      <label htmlFor={employmentTypesList.employmentTypeId} className="label">
        {employmentTypesList.label}
      </label>
    </li>
  )
}

export default FilterDetails
