import './css/App.css'

import { useState } from 'react'
import {
  ChangeSettings,
  SettingContext,
  SettingsValues,
} from './context/SettingContext'

import Game from './components/game/Game'

const defaultValue: SettingsValues = {
  isStarted: false,
  isCompleted: false,
  difficulty: 'easy',
  timer: 0,
  pause: false,
  timer_display: true,
  wa_display: false,
  same_digits_display: true,
  digits_count_display: false,
}

function App() {
  const [currentSettings, setCurrentSettings] = useState(defaultValue)

  const changeSettings: ChangeSettings = (newValues) =>
    setCurrentSettings(Object.create(Object.assign(currentSettings, newValues)))

  return (
    <SettingContext.Provider
      value={{
        currentSettings,
        changeSettings,
      }}
    >
      <div className="pageContainer" id="pageContainer">
        <Game />
      </div>
    </SettingContext.Provider>
  )
}

export default App
