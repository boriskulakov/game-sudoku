import { createContext } from 'react'

export interface SettingsValues {
  isStarted: boolean
  isCompleted: boolean
  difficulty: 'easy' | 'medium' | 'hard'
  timer: number
  pause: boolean
  timer_display: boolean
  wa_display: boolean
  same_digits_display: boolean
  digits_count_display: boolean
}

type NewValues = {
  [key in keyof SettingsValues]?: SettingsValues[key]
}

export type ChangeSettings = (arg0: NewValues) => void

export interface SettingContext {
  currentSettings: SettingsValues
  changeSettings: ChangeSettings
}

export const SettingContext = createContext<SettingContext>(
  {} as SettingContext
)
