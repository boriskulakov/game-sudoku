import styles from './board.module.css'
import classNames from 'classnames'

import { useContext } from 'react'
import { SettingContext } from '@/context/SettingContext'

import Block from './block/Block'

function Board() {
  const { currentSettings } = useContext(SettingContext)

  return (
    <div
      className={classNames(
        styles.board,
        currentSettings.isCompleted && styles.completed
      )}
    >
      {new Array(9).fill(null).map((_, blockNumber) => (
        <Block key={blockNumber} blockNumber={blockNumber} />
      ))}
      {currentSettings.pause && <div className={classNames(styles.blur)}></div>}
    </div>
  )
}
export default Board
