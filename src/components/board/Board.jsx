import styles from './board.module.css'
import classNames from 'classnames'
import Block from './block/Block'

function Board({ currentDigit, gameInfo, changeGameInfo, isPaused }) {
  return (
    <div
      className={classNames(
        styles.board,
        gameInfo.get('completed') && styles.completed
      )}
    >
      {new Array(9).fill(null).map((_, blockNumber) => (
        <Block
          key={blockNumber}
          blockNumber={blockNumber}
          currentDigit={currentDigit}
          gameInfo={gameInfo}
          changeGameInfo={changeGameInfo}
          isPaused={isPaused}
        />
      ))}
      {isPaused && <div className={classNames(styles.blur)}></div>}
    </div>
  )
}
export default Board
