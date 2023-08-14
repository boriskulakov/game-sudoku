import styles from './toggle.module.css'
import classNames from 'classnames'

interface ToggleProps {
  toggleValue: boolean
  setToggleValue: (arg0: boolean) => void
}

function Toggle({ toggleValue, setToggleValue }: ToggleProps) {
  const toggleSwitch = () => setToggleValue(!toggleValue)

  return (
    <button
      className={classNames(styles.toggle)}
      data-on={toggleValue}
      onClick={toggleSwitch}
    ></button>
  )
}

export default Toggle
