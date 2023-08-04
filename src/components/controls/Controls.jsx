import styles from './controls.module.css'
import classNames from 'classnames'
import eraser from '../../img/eraser.png'
import pencil from '../../img/pencil.svg'

function Controls() {
  return (
    <div className={classNames(styles.controls)}>
      <button className={classNames(styles.active, styles.button)}>1</button>
      {[2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
        <button className={classNames(styles.button)} key={digit}>
          {digit}
        </button>
      ))}

      <button
        className={classNames(styles.eraser, styles.button)}
        style={{
          backgroundImage: `url(${eraser})`,
          backgroundSize: '75%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      ></button>
      <button
        className={classNames(styles.notes, styles.button)}
        style={{
          backgroundImage: `url(${pencil})`,
          backgroundSize: '80%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      ></button>
    </div>
  )
}
export default Controls
