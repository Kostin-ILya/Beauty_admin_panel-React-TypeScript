import { useState, useLayoutEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface IPortalProps {
  children: ReactNode
  container?: string
}

const createWrapperAndAppentToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div')
  wrapperElement.id = wrapperId
  // wrapperElement.className = 'modal'

  document.body.appendChild(wrapperElement)

  return wrapperElement
}

const Portal = ({ children, container = 'portal-wrapper' }: IPortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    let element = document.getElementById(container)
    let created = false

    if (!element) {
      element = createWrapperAndAppentToBody(container)
      created = true
    }

    setWrapperElement(element)

    return () => {
      if (created) {
        element?.remove()
      }
    }
  }, [container])

  return wrapperElement && createPortal(children, wrapperElement)
}

export default Portal
