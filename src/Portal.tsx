import { createPortal } from 'react-dom'

interface PortalProps {
  children?: React.ReactNode
}

function Portal({ children }: PortalProps) {
  const portalRoot = document.getElementById('pageContainer') as HTMLElement
  return createPortal(children, portalRoot)
}
export default Portal
