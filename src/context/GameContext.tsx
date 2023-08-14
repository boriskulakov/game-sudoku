import { createContext } from 'react'
import { ChangeGameInfo, GameCellInfo } from '@/components/game/Game'

type Digits = 0| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface GameContext {
  currentDigit: Digits | null
  setCurrentDigit: (arg0: Digits | null) => void
  gameInfo: Map<number, GameCellInfo[]>
  changeGameInfo: ChangeGameInfo
  isNotesActive: boolean
  setIsNotesActive: (arg0: boolean) => void
}

export const GameContext = createContext<GameContext>({} as GameContext)
