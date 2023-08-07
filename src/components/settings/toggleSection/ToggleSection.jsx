import styles from '../setting.module.css'
import classNames from 'classnames'
import Toggle from '../../toggle/Toggle'
import { useContext, useState } from 'react'
import { SettingContext } from '@/SettingContext.jsx'

function ToggleSection() {
  const { currentSettings, changeSettings } = useContext(SettingContext)

  const [timerToggle, setTimerToggle] = useState(currentSettings.timer_display)
  const [waToggle, setWaToggle] = useState(currentSettings.wa_display)
  const [sameDigitsToggle, setSameDigitsToggle] = useState(
    currentSettings.same_digits_display
  )
  const [digitsCountToggle, setDigitsCountToggle] = useState(
    currentSettings.digits_count_display
  )

  const onTimerSwitch = (value) => {
    setTimerToggle(value)
    changeSettings({ timer_display: value })
  }

  const onWASwitch = (value) => {
    setWaToggle(value)
    changeSettings({ wa_display: value })
  }

  const onSameDigitsSwitch = (value) => {
    setSameDigitsToggle(value)
    changeSettings({ same_digits_display: value })
  }

  const onDigitsCountSwitch = (value) => {
    setDigitsCountToggle(value)
    changeSettings({ digits_count_display: value })
  }

  return (
    <div className={classNames(styles.settings)}>
      <div className={classNames(styles.option)}>
        <span className={classNames(styles.name)}>Таймер</span>
        <Toggle toggleValue={timerToggle} setToggleValue={onTimerSwitch} />
      </div>
      <div className={classNames(styles.option)}>
        <span className={classNames(styles.name)}>Подсвечивать ошибки</span>
        <Toggle toggleValue={waToggle} setToggleValue={onWASwitch} />
      </div>
      <div className={classNames(styles.option)}>
        <span className={classNames(styles.name)}>
          Подсвечивать выбранные цифры
        </span>
        <Toggle
          toggleValue={sameDigitsToggle}
          setToggleValue={onSameDigitsSwitch}
        />
      </div>
      <div className={classNames(styles.option)}>
        <span className={classNames(styles.name)}>
          Показывать количество цифр
        </span>
        <Toggle
          toggleValue={digitsCountToggle}
          setToggleValue={onDigitsCountSwitch}
        />
      </div>
    </div>
  )
}
export default ToggleSection
