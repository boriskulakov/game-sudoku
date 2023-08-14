import styles from '../board.module.css'
import classNames from 'classnames'

import { useContext } from 'react'
import { SettingContext } from '@/context/SettingContext'
import { GameContext } from '@/context/GameContext'
import { GameCellInfo } from '@/components/game/Game'

type Digits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
const NUMBERS: Digits[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

interface CellProps {
  blockInfo: GameCellInfo[] | undefined
  changeGameInfo: (arg0: GameCellInfo, arg1: number) => void
  cellNumber: number
}

type ClickEvent = React.MouseEvent<HTMLDivElement | HTMLSpanElement>

function Cell({ blockInfo, changeGameInfo, cellNumber }: CellProps) {
  const { currentSettings } = useContext(SettingContext)
  const { currentDigit, isNotesActive } = useContext(GameContext)

  const cellInfo = blockInfo?.[cellNumber]

  const fillCell = (event: ClickEvent, cellInfo?: GameCellInfo) => {
    if (currentSettings.isCompleted) return
    if (!currentSettings.isStarted) return
    if (!cellInfo) return
    if (cellInfo.isInitial) return
    let target = event.target as HTMLElement | null
    if (!(target instanceof Element) || !target) return

    target = target.closest(`.${styles.cell}`)
    if (!target?.firstChild) return

    const previousDigit = target?.firstChild?.textContent

    if (isNotesActive && currentDigit) {
      cellInfo.notes.has(currentDigit)
        ? cellInfo.notes.delete(currentDigit)
        : cellInfo.notes.add(currentDigit)
    } else {
      const cellDigit =
        currentDigit && currentDigit !== cellInfo.actualDigit ? currentDigit : 0

      target.firstChild.textContent = cellDigit ? `${cellDigit}` : ''
      cellInfo.actualDigit = cellDigit
      cellInfo.notes = new Set()
      if (cellInfo.actualDigit !== cellInfo.correctDigit) cellInfo.wa = true
    }

    changeGameInfo(cellInfo, +previousDigit!)
  }

  const isSameDigit =
    currentSettings.same_digits_display &&
    !currentSettings.pause &&
    !currentSettings.isCompleted &&
    currentDigit &&
    cellInfo?.actualDigit === currentDigit

  const isWrongAnswer =
    currentSettings.wa_display &&
    cellInfo?.actualDigit &&
    cellInfo?.actualDigit !== cellInfo?.correctDigit

  return (
    <div
      className={classNames(
        styles.cell,
        isSameDigit && styles.same,
        isWrongAnswer && styles.wa,
        cellInfo?.isInitial && styles.initial
      )}
      onClick={(e: ClickEvent) => fillCell(e, cellInfo)}
    >
      <span className={classNames(styles.cellNumber)}>
        {cellInfo?.actualDigit
          ? cellInfo?.actualDigit
          : cellInfo?.isInitial
          ? cellInfo?.correctDigit
          : null}
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
