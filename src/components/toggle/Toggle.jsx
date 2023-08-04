import classNames from 'classnames'
import styles from './toggle.module.css'

function Toggle({ toggleValue, setToggleValue }) {
  const toggleSwitch = () => setToggleValue((prev) => !prev)

  return (
    <button
      className={classNames(styles.toggle)}
      data-on={toggleValue}
      onClick={toggleSwitch}
    ></button>
  )
}

export default Toggle
