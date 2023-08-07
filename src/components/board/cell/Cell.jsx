import styles from '../board.module.css'
import classNames from 'classnames'
import { useContext } from 'react'
import { SettingContext } from '@/SettingContext'

function Cell({
  currentDigit,
  gameInfo,
  blockInfo,
  changeGameInfo,
  cellNumber,
}) {
  const { currentSettings } = useContext(SettingContext)
  const cellInfo = blockInfo?.[cellNumber]

  const fillCell = (target, cellInfo) => {
    if (currentSettings.isCompleted) return
    if (!currentSettings.isStarted) return
    if (cellInfo.isInitial) return

    const cellDigit =
      currentDigit && currentDigit !== cellInfo.actualDigit ? currentDigit : ''
    target.textContent = cellDigit
    cellInfo.actualDigit = cellDigit
    if (cellInfo.actualDigit !== cellInfo.correctDigit) cellInfo.wa = true
    changeGameInfo(cellInfo)
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
      onClick={(e) => fillCell(e.target, cellInfo)}
    >
      {cellInfo?.actualDigit || (cellInfo?.isInitial && cellInfo?.correctDigit)}
    </div>
  )
}
export default Cell
