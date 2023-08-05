import styles from './header.module.css'
import classNames from 'classnames'
import SettingMenu from '../settings/SettingMenu'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Timer from './timer/Timer'

function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const portalRoot = document.getElementById('pageContainer')

  return (
    <div className={classNames(styles.header)}>
      <button
        className={classNames(styles.settings)}
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        Настройки
      </button>
      <Timer />
      {settingsOpen &&
        createPortal(
          <SettingMenu onClose={() => setSettingsOpen(false)} />,
          portalRoot
        )}
    </div>
  )
}
export default Header
