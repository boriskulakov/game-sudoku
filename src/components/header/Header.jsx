import styles from './header.module.css'
import classNames from 'classnames'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import SettingMenu from '../settings/SettingMenu'

function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const portalRoot = document.getElementById('pageContainer')

  return (
    <div className={classNames(styles.header)}>
      <button className={classNames(styles.pause)}>Пауза</button>
      <div className={classNames(styles.timer)}>00:00</div>
      <button
        className={classNames(styles.settings)}
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        Настройки
      </button>
      {settingsOpen && createPortal(<SettingMenu />, portalRoot)}
    </div>
  )
}
export default Header
