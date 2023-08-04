import styles from './board.module.css'
import classNames from 'classnames'

function Board({ currentDigit }) {
  const fillCell = (target) => {
    target.textContent = currentDigit ? currentDigit : ''
  }

  return (
    <div className={classNames(styles.board)}>
      {new Array(9).fill(null).map((_, ix) => (
        <div className={classNames(styles.square)} key={ix}>
          {new Array(9).fill(null).map((_, ix) => (
            <div
              className={classNames(styles.cell)}
              key={ix}
              onClick={(e) => fillCell(e.target)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  )
}
export default Board
