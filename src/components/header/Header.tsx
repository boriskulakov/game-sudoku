import styles from './header.module.css'
import classNames from 'classnames'

import { useContext, useState } from 'react'
import { SettingContext } from '@/context/SettingContext'

import Timer from './timer/Timer'
import Portal from '@/Portal'
import SettingMenu from '../settings/SettingMenu'

type Digits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

interface HeaderProps {
  setLevelContent: (arg0: Digits[][] | null) => void
  resetGameInfo: () => void
}

function Header({ setLevelContent, resetGameInfo }: HeaderProps) {
  const { currentSettings } = useContext(SettingContext)
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className={classNames(styles.header)}>
      <button
        className={classNames(styles.settings)}
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        Настройки
      </button>

      {currentSettings.isCompleted && (
        <p className={classNames(styles.victory)}>Победа!</p>
      )}

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
