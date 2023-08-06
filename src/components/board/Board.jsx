import styles from './board.module.css'
import classNames from 'classnames'

function Board({ currentDigit, levelContent }) {
  const { blocks } = levelContent || { blocks: [] }

  const fillCell = (target) => {
    target.textContent = currentDigit ? currentDigit : ''
  }

  return (
    <div className={classNames(styles.board)}>
      {new Array(9).fill(null).map((_, blockNumber) => (
        <div className={classNames(styles.square)} key={blockNumber}>
          {new Array(9).fill(null).map((_, cellNumber) => (
            <div
              className={classNames(styles.cell)}
              key={cellNumber}
              onClick={(e) => fillCell(e.target)}
            >
              {blocks?.[blockNumber]?.[cellNumber]}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
export default Board
