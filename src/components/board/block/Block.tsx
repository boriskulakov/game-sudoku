import styles from '../board.module.css'
import classNames from 'classnames'

import { useContext } from 'react'
import { SettingContext } from '@/context/SettingContext'
import { GameContext } from '@/context/GameContext'

import Cell from '../cell/Cell'

function Block({ blockNumber }: { blockNumber: number }) {
  const { currentSettings } = useContext(SettingContext)
  const { gameInfo, changeGameInfo } = useContext(GameContext)

  const blockInfo = gameInfo.get(blockNumber)
  const isFullBlock =
    !currentSettings.pause &&
    blockInfo?.filter((cell) => cell.actualDigit > 0).length === 9

  return (
    <div className={classNames(styles.square, isFullBlock && styles.full)}>
      {new Array(9).fill(null).map((_, cellNumber) => (
        <Cell
          key={cellNumber}
          blockInfo={blockInfo}
          cellNumber={cellNumber}
          changeGameInfo={changeGameInfo.bind(null, blockNumber, cellNumber)}
        />
      ))}
    </div>
  )
}
export default Block
