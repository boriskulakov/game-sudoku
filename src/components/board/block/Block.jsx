import styles from '../board.module.css'
import classNames from 'classnames'
import Cell from '../cell/Cell'

function Block({ blockNumber, currentDigit, gameInfo, changeGameInfo }) {
  const blockInfo = gameInfo.get(blockNumber)
  const isFullBlock =
    blockInfo?.filter((cell) => cell.actualDigit > 0).length === 9

  return (
    <div className={classNames(styles.square, isFullBlock && styles.full)}>
      {new Array(9).fill(null).map((_, cellNumber) => (
        <Cell
          key={cellNumber}
          gameInfo={gameInfo}
          blockInfo={blockInfo}
          cellNumber={cellNumber}
          currentDigit={currentDigit}
          changeGameInfo={changeGameInfo.bind(null, blockNumber, cellNumber)}
        />
      ))}
    </div>
  )
}
export default Block
