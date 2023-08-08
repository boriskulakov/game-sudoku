import styles from './header.module.css'
import classNames from 'classnames'
import SettingMenu from '../settings/SettingMenu'

import { useState } from 'react'
import Timer from './timer/Timer'
import Portal from '@/Portal'

function Header({ setLevelContent, isVictory, resetGameInfo }) {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className={classNames(styles.header)}>
      <button
        className={classNames(styles.settings)}
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        Настройки
      </button>

      {isVictory && <p className={classNames(styles.victory)}>Победа!</p>}

      <Timer />

      {settingsOpen && (
        <Portal>
          <SettingMenu
            onClose={() => setSettingsOpen(false)}
            setLevelContent={setLevelContent}
            resetGameInfo={resetGameInfo}
          />
        </Portal>
      )}
    </div>
  )
}
export default Header
