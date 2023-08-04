import styles from './board.module.css'
import classNames from 'classnames'

function Board() {
  return (
    <div className={classNames(styles.board)}>
      <div className={classNames(styles.square)}>
        <div className={classNames(styles.cell, styles.wa)}>1</div>
        <div className={classNames(styles.cell)}>2</div>
        <div className={classNames(styles.cell)}>3</div>
        <div className={classNames(styles.cell)}>4</div>
        <div className={classNames(styles.cell)}>5</div>
        <div className={classNames(styles.cell)}>6</div>
        <div className={classNames(styles.cell)}>7</div>
        <div className={classNames(styles.cell)}>8</div>
        <div className={classNames(styles.cell)}>9</div>
      </div>

      {new Array(8).fill(null).map((_, ix) => (
        <div className={classNames(styles.square)} key={ix}>
          {new Array(9).fill(null).map((_, ix) => (
            <div className={classNames(styles.cell)} key={ix}></div>
          ))}
        </div>
      ))}
    </div>
  )
}
export default Board
