import styles from './game.module.css'
import classNames from 'classnames'

import { useContext, useState } from 'react'
import { SettingContext } from '@/context/SettingContext'
import { GameContext } from '@/context/GameContext'
import { shuffle } from '@/generator/shuffle'

import Header from '../header/Header'
import Board from '../board/Board'
import Controls from '../controls/Controls'

type Digits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface GameCellInfo {
  correctDigit: Digits | 0
  actualDigit: Digits | 0
  wa: boolean
  isInitial: boolean
  notes: Set<Digits>
}

export type ChangeGameInfo = (
  blockNumber: number,
  cellNumber: number,
  cellInfo: GameCellInfo,
  previousDigit: number
) => void

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const increaseMapItem = (
  currentMap: Map<number, number>,
  index: number,
  diff: number
) => {
  currentMap.set(index, (currentMap.get(index) as number) + diff)
}

function Game() {
  const { currentSettings, changeSettings } = useContext(SettingContext)

  const [currentDigit, setCurrentDigit] = useState<Digits | 0 | null>(null)
  const [isNotesActive, setIsNotesActive] = useState(false)
  const [isBoardFilled, setIsBoardFilled] = useState(false)
  const [levelContent, setLevelContent] = useState<Digits[][] | null>(null)
  const [digitCounter, setDigitCounter] = useState<Map<number, number> | null>(
    null
  )
  const [gameInfo, setGameInfo] = useState(new Map<number, GameCellInfo[]>())

  const getDefaultGameInfo = () => {
    const infoTemplate = new Map<number, GameCellInfo[]>()
    for (let blockNumber = 0; blockNumber < 9; blockNumber++) {
      const currentBlock: GameCellInfo[] = new Array(9).fill(null).map(() => ({
        correctDigit: 0,
        actualDigit: 0,
        wa: false,
        isInitial: false,
        notes: new Set(),
      }))
      infoTemplate.set(blockNumber, currentBlock)
    }

    return infoTemplate
  }

  const resetGameInfo = () => {
    let currentGameInfo = [...gameInfo.entries()].slice(0, 9)
    const changedDigitsCounter = new Map(NUMBERS.map((digit) => [digit, 0]))

    for (const block of currentGameInfo) {
      for (let cell of block[1]) {
        cell.notes = new Set()

        if (!cell.isInitial) {
          cell.actualDigit = 0
          cell.wa = false
        }

        if (changedDigitsCounter.has(cell.actualDigit)) {
          increaseMapItem(changedDigitsCounter, cell.actualDigit, 1)
        }
      }
    }

    setGameInfo(new Map(currentGameInfo))
    setIsBoardFilled(true)
    changeSettings({ isCompleted: false })
    setDigitCounter(changedDigitsCounter)
  }

  const changeGameInfo: ChangeGameInfo = (
    blockNumber,
    cellNumber,
    cellInfo,
    previousDigit
  ) => {
    let entries = [...gameInfo.entries()]
    entries[blockNumber][1][cellNumber] = cellInfo

    const isGameComplete =
      entries
        .slice(0, 9)
        .filter(
          (block) =>
            block[1].filter((cell) => cell.correctDigit === cell.actualDigit)
              .length === 9
        ).length === 9
    if (isGameComplete) changeSettings({ isCompleted: true })

    const changedDigitsCounter = new Map(digitCounter)
    const actualDigit = cellInfo.actualDigit
    if (actualDigit) {
      increaseMapItem(changedDigitsCounter, actualDigit, 1)
    }
    if (previousDigit) {
      increaseMapItem(changedDigitsCounter, previousDigit, -1)
    }

    setDigitCounter(changedDigitsCounter)
    setGameInfo(new Map(entries))
  }

  if (!levelContent && isBoardFilled) {
    setIsBoardFilled(false)
    setDigitCounter(new Map())
    setGameInfo(getDefaultGameInfo())
  }

  if (levelContent && !isBoardFilled) {
    const defaultInfo = getDefaultGameInfo()
    const defaultDigitCounters = new Map(NUMBERS.map((digit) => [digit, 0]))

    for (let blockNumber = 0; blockNumber < 9; blockNumber++) {
      const currentBlock = defaultInfo.get(blockNumber)
      if (!currentBlock) break

      let initialNumberCount = 0

      if (currentSettings.difficulty === 'easy')
        initialNumberCount = Math.ceil(Math.random() * 3) + 4
      if (currentSettings.difficulty === 'medium')
        initialNumberCount = Math.ceil(Math.random() * 4) + 2
      if (currentSettings.difficulty === 'hard')
        initialNumberCount = Math.ceil(Math.random() * 4)

      let initialCells = shuffle(NUMBERS).slice(0, initialNumberCount)
      for (let cell = 0; cell < 9; cell++) {
        let cellDigit = levelContent[blockNumber][cell]
        currentBlock[cell].correctDigit = cellDigit

        if (initialCells.includes(cellDigit)) {
          currentBlock[cell].actualDigit = cellDigit
          currentBlock[cell].isInitial = true

          increaseMapItem(defaultDigitCounters, cellDigit, 1)
        }
      }
    }
    setIsBoardFilled(true)
    setGameInfo(defaultInfo)
    setDigitCounter(defaultDigitCounters)
  }

  return (
    <div className={classNames(styles.container)}>
      <Header setLevelContent={setLevelContent} resetGameInfo={resetGameInfo} />
      <GameContext.Provider
        value={{
          currentDigit,
          setCurrentDigit,
          gameInfo,
          changeGameInfo,
          isNotesActive,
          setIsNotesActive,
        }}
      >
        <Board />
        <Controls digitCounter={digitCounter} />
      </GameContext.Provider>
    </div>
  )
}

export default Game
