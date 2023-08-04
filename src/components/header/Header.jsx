import styles from './header.module.css'
import classNames from 'classnames'
import SettingMenu from '../settings/SettingMenu'

import playIcon from '@/img/play.svg'
import pauseIcon from '@/img/pause.svg'

import { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { SettingContext } from '@/SettingContext'

function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const portalRoot = document.getElementById('pageContainer')

  const { currentSettings, changeSettings } = useContext(SettingContext)

  const setPause = () => changeSettings({ pause: !currentSettings.pause })
  const currentPauseIcon = currentSettings.pause ? playIcon : pauseIcon

  return (
    <div className={classNames(styles.header)}>
      <button
        className={classNames(styles.settings)}
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        Настройки
      </button>

      {currentSettings.timer_display && (
        <div className={classNames(styles.timer)}>
          <span className={classNames(styles.time)}>00:00</span>
          {currentSettings.timer > 0 && (
            <button
              className={classNames(styles.pause)}
              onClick={setPause}
              style={{
                backgroundImage: `url(${currentPauseIcon})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            ></button>
          )}
        </div>
      )}
      {settingsOpen &&
        createPortal(
          <SettingMenu onClose={() => setSettingsOpen(false)} />,
          portalRoot
        )}
    </div>
  )
}
export default Header
