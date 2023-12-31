import styles from './modal.module.css'
import classNames from 'classnames'

import { useEffect } from 'react'

interface ModalProps {
  onClose: () => void
  onConfirm: () => void
}

function Modal({ onClose, onConfirm }: ModalProps) {
  const onKeydown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') onClose()
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  return (
    <div className={classNames(styles.container)} onClick={onClose}>
      <div className={classNames(styles.modal)}>
        <button className={classNames(styles.close)} onClick={onClose} />
        <p className={classNames(styles.title)}>Начать новую игру?</p>
        <p className={classNames(styles.subtitle)}>
          Прогресс текущей партии будет потерян
        </p>
        <div className={classNames(styles.buttons)}>
          <button
            className={classNames(styles.button, styles.confirm)}
            onClick={onConfirm}
          >
            Да
          </button>
          <button
            className={classNames(styles.button, styles.reject)}
            onClick={onClose}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
