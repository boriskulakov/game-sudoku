import styles from './setting.module.css'
import classNames from 'classnames'
import { useContext, useState } from 'react'
import { SettingContext } from '../../SettingContext.jsx'
import Toggle from '../toggle/Toggle'

function SettingMenu() {
  // const { currentSettings, setCurrentSettings } = useContext(SettingContext)
  const [toggleValue, setToggleValue] = useState(true)
  const [toggleValue1, setToggleValue1] = useState(true)
  const [toggleValue2, setToggleValue2] = useState(true)

  return (
    <div className={classNames(styles.container)}>
      <p className={classNames(styles.title)}>Настройки</p>
      <div className={classNames(styles.game)}>
        <button className={classNames(styles.but, styles.start)}>
          Начать игру
        </button>
        <button className={classNames(styles.but, styles.restart)}>
          Рестарт
        </button>
        <button className={classNames(styles.but, styles.new)}>
          Новая игра
        </button>
      </div>
      <div className={classNames(styles.difficulty)}>
        <p className={classNames(styles.subtitle)}>Сложность</p>
        <div className={classNames(styles.levels)}>
          <button className={classNames(styles.level, styles.active)}>
            Легко
          </button>
          <button className={classNames(styles.level)}>Средне</button>
          <button className={classNames(styles.level)}>Сложно</button>
        </div>
      </div>
      <div className={classNames(styles.settings)}>
        <div className={classNames(styles.option)}>
          <span className={classNames(styles.name)}>Таймер</span>
          <Toggle toggleValue={toggleValue} setToggleValue={setToggleValue} />
        </div>
        <div className={classNames(styles.option)}>
          <span className={classNames(styles.name)}>Подсвечивать ошибки</span>
          <Toggle toggleValue={toggleValue1} setToggleValue={setToggleValue1} />
        </div>
        <div className={classNames(styles.option)}>
          <span className={classNames(styles.name)}>Подсвечивать выбранные цифры</span>
          <Toggle toggleValue={toggleValue2} setToggleValue={setToggleValue2} />
        </div>
      </div>
    </div>
  )
}

export default SettingMenu
