import styles from './game.module.css'
import classNames from 'classnames'
import eraser from '../../img/eraser.png'
import pencil from '../../img/pencil.svg'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import SettingMenu from '../settings/SettingMenu'

function Game() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const portalRoot = document.getElementById('pageContainer')

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.header)}>
        <button className={classNames(styles.pause)}>Пауза</button>
        <div className={classNames(styles.timer, styles.number)}>00:00</div>
        <button
          className={classNames(styles.settings)}
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          Настройки
        </button>
        {settingsOpen && createPortal(<SettingMenu />, portalRoot)}
      </div>
      <div className={classNames(styles.board)}>
        <div className={classNames(styles.square)}>
          <div className={classNames(styles.cell, styles.wa, styles.number)}>
            1
          </div>
          <div className={classNames(styles.cell, styles.number)}>2</div>
          <div className={classNames(styles.cell, styles.number)}>3</div>
          <div className={classNames(styles.cell, styles.number)}>4</div>
          <div className={classNames(styles.cell, styles.number)}>5</div>
          <div className={classNames(styles.cell, styles.number)}>6</div>
          <div className={classNames(styles.cell, styles.number)}>7</div>
          <div className={classNames(styles.cell, styles.number)}>8</div>
          <div className={classNames(styles.cell, styles.number)}>9</div>
        </div>

        {new Array(8).fill(null).map((_, ix) => (
          <div className={classNames(styles.square)} key={ix}>
            {new Array(9).fill(null).map((_, ix) => (
              <div
                className={classNames(styles.cell, styles.number)}
                key={ix}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className={classNames(styles.controls)}>
        <button
          className={classNames(styles.number, styles.active, styles.button)}
        >
          1
        </button>
        {[2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <button
            className={classNames(styles.number, styles.button)}
            key={digit}
          >
            {digit}
          </button>
        ))}

        <button
          className={classNames(styles.eraser, styles.number, styles.button)}
          style={{
            backgroundImage: `url(${eraser})`,
            backgroundSize: '75%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></button>
        <button
          className={classNames(styles.notes, styles.number, styles.button)}
          style={{
            backgroundImage: `url(${pencil})`,
            backgroundSize: '80%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></button>
      </div>
    </div>
  )
}

export default Game
