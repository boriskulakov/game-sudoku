import styles from '../header.module.css'
import classNames from 'classnames'
import playIcon from '@/img/play.svg'
import pauseIcon from '@/img/pause.svg'
import { useContext, useEffect } from 'react'
import { SettingContext } from '@/SettingContext'

function Timer() {
  const { currentSettings, changeSettings } = useContext(SettingContext)
  const {
    isStarted,
    pause: currentPause,
    timer: currentTimer,
    timer_display: currentTimer_display,
  } = currentSettings

  const setPause = () => changeSettings({ pause: !currentPause })
  const currentPauseIcon = currentPause ? playIcon : pauseIcon

  const currentTime = `${
    currentTimer / 3600 > 1 ? Math.trunc(currentTimer / 3600) + ':' : ''
  }${
    currentTimer / 60 > 9
      ? Math.trunc(currentTimer / 60)
      : '0' + Math.trunc(currentTimer / 60)
  }:${currentTimer % 60 > 9 ? currentTimer % 60 : '0' + (currentTimer % 60)}`

  useEffect(() => {
    let timeoutId = null

    function increaseTime() {
      changeSettings({ timer: currentTimer + 1 })
      timeoutId = setTimeout(increaseTime, 1000)
    }

    if (isStarted && !currentPause) {
      timeoutId = setTimeout(increaseTime, 1000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [changeSettings, isStarted, currentTimer, currentPause])

  return (
    <>
      {currentTimer_display && (
        <div className={classNames(styles.timer)}>
          <span className={classNames(styles.time)}>{currentTime}</span>
          {isStarted && (
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
        </div>
      )}
    </>
  )
}
export default Timer
