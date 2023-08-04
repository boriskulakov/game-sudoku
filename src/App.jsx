import './App.css'
import { useState } from 'react'
import { SettingContext } from './SettingContext.jsx'
import Game from './components/game/Game'

const defaultValue = {
  difficulty: 'easy',
  timer: 0,
  pause: false,
  timer_display: true,
  wa_display: false,
  same_digits_display: true,
}

function App() {
  const [currentSettings, setCurrentSettings] = useState(defaultValue)

  const changeSettings = (newValues) =>
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
