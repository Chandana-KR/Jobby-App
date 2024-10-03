import './index.css'

const Location = props => {
  const {locationItem, changeLocation} = props
  const {label, locationId} = locationItem
  const onChangeLocation = activeId => {
    console.log(activeId)
    changeLocation(activeId)
  }
  return (
    <li className="location-item">
      <input
        type="checkbox"
        className="checkbox"
        id={locationId}
        onChange={() => onChangeLocation(label)}
      />
      <label className="label" htmlFor={locationId}>
        {label}
      </label>
    </li>
  )
}

export default Location
