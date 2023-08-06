import { createPortal } from 'react-dom'
function Portal({ children }) {
  const portalRoot = document.getElementById('pageContainer')
  return createPortal(children, portalRoot)
}
export default Portal
