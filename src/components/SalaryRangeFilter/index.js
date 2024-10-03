import './index.css'

const SalaryRangeFilter = props => {
  const {salaryRangesList, salaryRange, changeSalaryRange} = props

  const onChangeSalaryRange = activeId => {
    changeSalaryRange(activeId)
  }

  return (
    <li className="salary-range-item-container">
      <input
        type="radio"
        name="salaryRange"
        value={salaryRange}
        className="checkbox"
        id={salaryRangesList.salaryRangeId}
        onChange={() => onChangeSalaryRange(salaryRangesList.salaryRangeId)}
      />
      <label htmlFor={salaryRangesList.salaryRangeId} className="label">
        {salaryRangesList.label}
      </label>
    </li>
  )
}

export default SalaryRangeFilter
