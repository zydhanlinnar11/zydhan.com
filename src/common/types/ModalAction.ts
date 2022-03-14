import { MouseEventHandler } from 'react'

type ModalAction = {
  handler: MouseEventHandler<HTMLElement>
  text: string
  type: 'danger' | 'normal' | 'success'
}

export default ModalAction
