import './index.css'

const Skills = props => {
  const {skill} = props
  const {imageSkill, name} = skill
  console.log(skill)
  return (
    <li className="list-item">
      <img src={imageSkill} alt={name} className="image" />
      <p className="skill-name">{skill.name}</p>
    </li>
  )
}
export default Skills
