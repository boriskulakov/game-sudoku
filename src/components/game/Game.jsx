import styles from './game.module.css'
import classNames from 'classnames'
import Board from '../board/Board'
import Controls from '../controls/Controls'
import Header from '../header/Header'
import { useState } from 'react'

function Game() {
  const [currentDigit, setCurrentDigit] = useState(null)
  const [isNotesActive, setIsNotesActive] = useState(false)
  const [levelContent, setLevelContent] = useState(null)

  return (
    <div className={classNames(styles.container)}>
      <Header setLevelContent={setLevelContent} />
      <Board currentDigit={currentDigit} levelContent={levelContent} />
      <Controls
        setCurrentDigit={setCurrentDigit}
        isNotesActive={isNotesActive}
        setIsNotesActive={setIsNotesActive}
      />
    </div>
  )
}

export default Game
