import styles from '../setting.module.css'
import classNames from 'classnames'

import { useContext, useState } from 'react'
import { SettingContext } from '@/context/SettingContext'

import Toggle from '../../toggle/Toggle'

type SwitchHandler = (arg0: boolean) => void

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

  const onTimerSwitch: SwitchHandler = (value) => {
    setTimerToggle(value)
    changeSettings({ timer_display: value })
  }

  const onWASwitch: SwitchHandler = (value) => {
    setWaToggle(value)
    changeSettings({ wa_display: value })
  }

  const onSameDigitsSwitch: SwitchHandler = (value) => {
    setSameDigitsToggle(value)
    changeSettings({ same_digits_display: value })
  }

  const onDigitsCountSwitch: SwitchHandler = (value) => {
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
          Показывать количество цифр
        </span>
        <Toggle
          toggleValue={digitsCountToggle}
          setToggleValue={onDigitsCountSwitch}
        />
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
    </div>
  )
}
export default ToggleSection
