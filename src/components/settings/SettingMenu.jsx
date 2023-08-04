import React from 'react'
import styles from './setting.module.css'
import classNames from 'classnames'
import { useContext } from 'react'
import { SettingContext } from '../../SettingContext.jsx'
import ToggleSection from './toggleSection/ToggleSection'
import closeIcon from '@/img/close.svg'

const levels = [
  { level: 'easy', text: 'Легко' },
  { level: 'medium', text: 'Средне' },
  { level: 'hard', text: 'Сложно' },
]

function SettingMenu({ onClose }) {
  const { currentSettings, changeSettings } = useContext(SettingContext)

  const setDifficulty = (level) => changeSettings({ difficulty: level })

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.header)}>
        <p className={classNames(styles.title)}>Настройки</p>
        <button
          className={classNames(styles.close)}
          onClick={onClose}
          style={{
            backgroundImage: `url(${closeIcon})`,
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></button>
      </div>

      <div className={classNames(styles.game)}>
        <button
          className={classNames(styles.but, styles.start)}
          disabled={currentSettings.timer > 0}
        >
          Начать игру
        </button>
        <button
          className={classNames(styles.but, styles.restart)}
          disabled={currentSettings.timer === 0}
        >
          Рестарт
        </button>
        <button
          className={classNames(styles.but, styles.new)}
          disabled={currentSettings.timer === 0}
        >
          Новая игра
        </button>
      </div>

      <div className={classNames(styles.difficulty)}>
        <p className={classNames(styles.subtitle)}>Сложность</p>
        <form className={classNames(styles.levels)}>
          {levels.map((lvl) => (
            <React.Fragment key={lvl.level}>
              <input
                type="radio"
                id={`difficulty_${lvl.level}`}
                name="difficulty"
                value={lvl.level}
                defaultChecked={lvl.level === currentSettings.difficulty}
                disabled={currentSettings.timer > 0}
                onClick={() => setDifficulty(lvl.level)}
              />
              <label
                htmlFor={`difficulty_${lvl.level}`}
                className={classNames(styles.level)}
              >
                {lvl.text}
              </label>
            </React.Fragment>
          ))}
        </form>
      </div>

      <ToggleSection />
    </div>
  )
}

export default SettingMenu
