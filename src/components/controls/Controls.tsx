import styles from './controls.module.css'
import classNames from 'classnames'

import { useContext, useState } from 'react'
import { SettingContext } from '@/context/SettingContext'
import { GameContext } from '@/context/GameContext'

import eraserIcon from '@/img/eraser.png'
import pencilIcon from '@/img/pencil.svg'

type Digits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
const NUMBERS: Digits[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function Controls({
  digitCounter,
}: {
  digitCounter: Map<number, number> | null
}) {
  const { currentSettings } = useContext(SettingContext)
  const { setCurrentDigit, isNotesActive, setIsNotesActive } =
    useContext(GameContext)

  const [activeDigit, setActiveDigit] = useState<Digits | 0 | null>(null)
  const isMaxCount = (digit: number) =>
    currentSettings.digits_count_display && digitCounter?.get(digit)! >= 9

  const changeDigit = (digit: Digits | 0) => {
    const newDigit = activeDigit === digit ? null : digit
    setActiveDigit(newDigit)
    setCurrentDigit(newDigit)
  }

  return (
    <div className={classNames(styles.controls)}>
      {NUMBERS.map((digit) => (
        <button
          className={classNames(
            styles.button,
            activeDigit === digit && styles.active,
            isMaxCount(digit) && styles.maxCount
          )}
          key={digit}
          onClick={() => changeDigit(digit)}
        >
          {digit}
          {currentSettings.digits_count_display && (
            <span className={classNames(styles.counter)}>
              {digitCounter?.get(digit)}
            </span>
          )}
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
