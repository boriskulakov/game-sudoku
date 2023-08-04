import styles from './controls.module.css'
import classNames from 'classnames'

import eraserIcon from '@/img/eraser.png'
import pencilIcon from '@/img/pencil.svg'

import { useState } from 'react'

function Controls({ setCurrentDigit, isNotesActive, setIsNotesActive }) {
  const [activeDigit, setActiveDigit] = useState(null)
  const changeDigit = (digit) => {
    const newDigit = activeDigit === digit ? null : digit
    setActiveDigit(newDigit)
    setCurrentDigit(newDigit)
  }

  return (
    <div className={classNames(styles.controls)}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
        <button
          className={classNames(
            styles.button,
            activeDigit === digit && styles.active
          )}
          key={digit}
          onClick={() => changeDigit(digit)}
        >
          {digit}
        </button>
      ))}

      <button
        className={classNames(
          styles.eraser,
          styles.button,
          activeDigit === 0 && styles.active
        )}
        onClick={() => changeDigit(0)}
        style={{
          backgroundImage: `url(${eraserIcon})`,
          backgroundSize: '75%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      ></button>

      <button
        className={classNames(
          styles.notes,
          styles.button,
          isNotesActive && styles.active
        )}
        onClick={() => setIsNotesActive(!isNotesActive)}
        style={{
          backgroundImage: `url(${pencilIcon})`,
          backgroundSize: '80%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      ></button>
    </div>
  )
}
export default Controls
