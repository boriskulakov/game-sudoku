import React, { useState } from 'react'
import styles from './setting.module.css'
import classNames from 'classnames'
import { useContext } from 'react'
import { SettingContext } from '../../SettingContext.jsx'
import { getSudokuContent } from '@/generator/generatorSudoku.js'
import closeIcon from '@/img/close.svg'
import ToggleSection from './toggleSection/ToggleSection'
import Portal from '@/Portal'
import Modal from './modal/Modal'

const levels = [
  { level: 'easy', text: 'Легко' },
  { level: 'medium', text: 'Средне' },
  { level: 'hard', text: 'Сложно' },
]

function SettingMenu({ onClose, setLevelContent, resetGameInfo }) {
  const { currentSettings, changeSettings } = useContext(SettingContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const setDifficulty = (level) => changeSettings({ difficulty: level })
  const startGame = () => {
    onClose()
    changeSettings({ isStarted: true })
    setLevelContent(getSudokuContent().blocks)
  }
  const setNewGame = () => {
    setIsModalOpen(false)
    changeSettings({
      isStarted: false,
      isCompleted: false,
      timer: 0,
      pause: false,
    })
    setLevelContent(null)
  }
  const resetGame = () => {
    onClose()
    changeSettings({
      isCompleted: false,
      timer: 0,
      pause: false,
    })
    resetGameInfo()
  }
  const openModal = () => {
    changeSettings({ pause: true })
    setIsModalOpen(true)
  }

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.header)}>
        <p className={classNames(styles.title)}>Настройки</p>
        <button
          className={classNames(styles.close)}
          onClick={onClose}
          style={{
            backgroundImage: `url(${closeIcon})`,
            backgroundSize: '60%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></button>
      </div>

      <div className={classNames(styles.game)}>
        <button
          className={classNames(styles.but, styles.start)}
          disabled={currentSettings.isStarted}
          onClick={startGame}
        >
          Начать игру
        </button>
        <button
          className={classNames(styles.but, styles.restart)}
          disabled={!currentSettings.isStarted}
          onClick={resetGame}
        >
          Рестарт
        </button>
        <button
          className={classNames(styles.but, styles.new)}
          disabled={!currentSettings.isStarted}
          onClick={openModal}
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
      {isModalOpen && (
        <Portal>
          <Modal
            onConfirm={setNewGame}
            onClose={() => setIsModalOpen(false)}
          ></Modal>
        </Portal>
      )}
    </div>
  )
}

export default SettingMenu
