import './App.css'
import { useState } from 'react'
import { SettingContext } from './SettingContext.jsx'
import Game from './components/game/Game'
import SettingMenu from './components/settings/SettingMenu'

const defaultValue = {
  difficulty: 'easy',
  timer: 0,
  timer_display: true,
  notes: false,
  wa_display: true,
}

function App() {
  const [currentSettings, setCurrentSettings] = useState(defaultValue)

  return (
    <SettingContext.Provider
      value={{
        currentSettings,
        setCurrentSettings,
      }}
    >
      <div className="pageContainer" id="pageContainer">
        <Game />
      </div>
    </SettingContext.Provider>
  )
}

export default App
