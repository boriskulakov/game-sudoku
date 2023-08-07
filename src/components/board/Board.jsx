import styles from './board.module.css'
import classNames from 'classnames'
import Block from './block/Block'

function Board({ currentDigit, gameInfo, changeGameInfo }) {
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
        />
      ))}
    </div>
  )
}
export default Board
