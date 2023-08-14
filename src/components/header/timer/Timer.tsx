import styles from '../header.module.css'
import classNames from 'classnames'

import { useContext, useEffect } from 'react'
import { SettingContext } from '@/context/SettingContext'

import playIcon from '@/img/play.svg'
import pauseIcon from '@/img/pause.svg'

function Timer() {
  const { currentSettings, changeSettings } = useContext(SettingContext)
  const {
    isStarted,
    isCompleted,
    pause: currentPause,
    timer: currentTimer,
    timer_display: currentTimer_display,
  } = currentSettings

  const setPause = () => changeSettings({ pause: !currentPause })
  const currentPauseIcon = currentPause ? playIcon : pauseIcon

  const currentTime = `${
    currentTimer / 3600 > 1 ? Math.trunc(currentTimer / 3600) + ':' : ''
  }${
    currentTimer / 60 >= 10
      ? Math.trunc(currentTimer / 60)
      : '0' + Math.trunc(currentTimer / 60)
  }:${currentTimer % 60 > 9 ? currentTimer % 60 : '0' + (currentTimer % 60)}`

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    function increaseTime() {
      changeSettings({ timer: currentTimer + 1 })
      timeoutId = setTimeout(increaseTime, 1000)
    }

    if (isStarted && !currentPause && !isCompleted) {
      timeoutId = setTimeout(increaseTime, 1000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [changeSettings, isStarted, currentTimer, currentPause, isCompleted])

  return (
    <div className={classNames(styles.timer)}>
      <>
        {currentTimer_display && (
          <span className={classNames(styles.time)}>{currentTime}</span>
        )}
        {isStarted && !isCompleted && (
          <button
            className={classNames(styles.pause)}
            onClick={setPause}
            style={{
              backgroundImage: `url(${currentPauseIcon})`,
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          ></button>
        )}
      </>
    </div>
  )
}
export default Timer
