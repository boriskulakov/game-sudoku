import styles from './game.module.css'
import classNames from 'classnames'
import Header from '../header/Header'
import Board from '../board/Board'
import Controls from '../controls/Controls'
import { useContext, useState } from 'react'
import { SettingContext } from '../../SettingContext'
import { shuffle } from '../../generator/shuffle'

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function Game() {
  const { currentSettings, changeSettings } = useContext(SettingContext)

  const [currentDigit, setCurrentDigit] = useState(null)
  const [isNotesActive, setIsNotesActive] = useState(false)
  const [levelContent, setLevelContent] = useState(null)
  const [gameInfo, setGameInfo] = useState(new Map([['filled', false]]))

  const getDefaultGameInfo = () => {
    const infoTemplate = new Map()
    for (let blockNumber = 0; blockNumber < 9; blockNumber++) {
      const currentBlock = new Array(9).fill(null).map(() => ({
        correctDigit: 0,
        actualDigit: 0,
        wa: false,
        isInitial: false,
      }))
      infoTemplate.set(blockNumber, currentBlock)
    }

    return infoTemplate
  }

  const changeGameInfo = (blockNumber, cellNumber, cellInfo) => {
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
    setGameInfo(new Map(entries.concat([['completed', isGameComplete]])))
  }

  if (!levelContent && gameInfo.get('filled')) {
    const defaultInfo = getDefaultGameInfo()
    defaultInfo.set('filled', false)
    setGameInfo(defaultInfo)
  }

  if (levelContent && !gameInfo.get('filled')) {
    const defaultInfo = getDefaultGameInfo()

    for (let blockNumber = 0; blockNumber < 9; blockNumber++) {
      const currentBlock = defaultInfo.get(blockNumber)
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
        }
      }
    }
    defaultInfo.set('filled', true)
    setGameInfo(defaultInfo)
  }

  return (
    <div className={classNames(styles.container)}>
      <Header
        setLevelContent={setLevelContent}
        isVictory={gameInfo.get('completed')}
      />
      <Board
        currentDigit={currentDigit}
        gameInfo={gameInfo}
        changeGameInfo={changeGameInfo}
        isPaused={currentSettings.pause}
      />
      <Controls
        setCurrentDigit={setCurrentDigit}
        isNotesActive={isNotesActive}
        setIsNotesActive={setIsNotesActive}
      />
    </div>
  )
}

export default Game
