import styles from './game.module.css'
import classNames from 'classnames'
import Board from '../board/Board'
import Controls from '../controls/Controls'
import Header from '../header/Header'

function Game() {
  return (
    <div className={classNames(styles.container)}>
      <Header />
      <Board />
      <Controls />
    </div>
  )
}

export default Game
