import styles from './game.module.css'
import classNames from 'classnames'
import Board from '../board/Board'
import Controls from '../controls/Controls'
import Header from '../header/Header'
import { useState } from 'react'

function Game() {
  const [currentDigit, setCurrentDigit] = useState(null)
  const [isNotesActive, setIsNotesActive] = useState(false)

  return (
    <div className={classNames(styles.container)}>
      <Header />
      <Board currentDigit={currentDigit} />
      <Controls
        setCurrentDigit={setCurrentDigit}
        isNotesActive={isNotesActive}
        setIsNotesActive={setIsNotesActive}
      />
    </div>
  )
}

export default Game
