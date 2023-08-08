import styles from '../board.module.css'
import classNames from 'classnames'
import { useContext } from 'react'
import { SettingContext } from '@/SettingContext'

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function Cell({
  currentDigit,
  gameInfo,
  blockInfo,
  changeGameInfo,
  cellNumber,
  isNotesActive,
}) {
  const { currentSettings } = useContext(SettingContext)
  const cellInfo = blockInfo?.[cellNumber]

  const fillCell = (target, cellInfo) => {
    if (currentSettings.isCompleted) return
    if (!currentSettings.isStarted) return
    if (cellInfo.isInitial) return

    const previousDigit = +target.firstChild.textContent

    if (isNotesActive && currentDigit > 0) {
      cellInfo.notes.has(currentDigit)
        ? cellInfo.notes.delete(currentDigit)
        : cellInfo.notes.add(currentDigit)
    } else {
      const cellDigit =
        currentDigit && currentDigit !== cellInfo.actualDigit
          ? currentDigit
          : ''

      target.firstChild.textContent = cellDigit
      cellInfo.actualDigit = cellDigit
      cellInfo.notes = new Set()
      if (cellInfo.actualDigit !== cellInfo.correctDigit) cellInfo.wa = true
    }

    changeGameInfo(cellInfo, previousDigit)
  }

  const isSameDigit =
    currentSettings.same_digits_display &&
    !currentSettings.pause &&
    !gameInfo.get('completed') &&
    currentDigit &&
    cellInfo?.actualDigit === currentDigit

  const isWrongAnswer =
    currentSettings.wa_display &&
    cellInfo?.actualDigit > 0 &&
    cellInfo?.actualDigit !== cellInfo?.correctDigit

  return (
    <div
      className={classNames(
        styles.cell,
        isSameDigit && styles.same,
        isWrongAnswer && styles.wa,
        cellInfo?.isInitial && styles.initial
      )}
      onClick={(e) => fillCell(e.target.closest(`.${styles.cell}`), cellInfo)}
    >
      <span className={classNames(styles.cellNumber)}>
        {cellInfo?.actualDigit ||
          (cellInfo?.isInitial && cellInfo?.correctDigit)}
      </span>
      <div className={classNames(styles.notes)}>
        {NUMBERS.map((digit) => (
          <span
            key={digit}
            className={classNames(
              styles.noteNumber,
              !cellInfo?.actualDigit &&
                cellInfo?.notes.has(digit) &&
                styles.noted
            )}
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  )
}
export default Cell
