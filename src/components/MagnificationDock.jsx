import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react'

function DockItem({
  children,
  className = '',
  onClick,
  href,
  download,
  target,
  rel,
  ariaLabel,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  isActive,
}) {
  const ref = useRef(null)
  const isHovered = useMotionValue(0)

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      left: 0,
      width: baseItemSize,
    }
    return val - rect.left - baseItemSize / 2
  })

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  )
  const size = useSpring(targetSize, spring)

  const Component = href ? motion.a : motion.button

  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const targetEl = document.getElementById(targetId)
      if (targetEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, {
            offset: -30,
            duration: 1.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          })
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' })
        }
        window.history.pushState(null, '', href)
      }
    }
  }

  const elementProps = href
    ? {
        href,
        download,
        target,
        rel,
        onClick: handleClick,
        'aria-label': ariaLabel,
        title: typeof ariaLabel === 'string' ? ariaLabel : undefined,
      }
    : {
        onClick: handleClick,
        type: 'button',
        'aria-label': ariaLabel,
        title: typeof ariaLabel === 'string' ? ariaLabel : undefined,
      }

  return (
    <Component
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={`dock-item ${isActive ? 'dock-item-active' : ''} ${className}`}
      {...elementProps}
    >
      {Children.map(children, (child) =>
        React.isValidElement(child)
          ? cloneElement(child, { isHovered })
          : child
      )}
      {isActive && <span className="dock-active-dot" aria-hidden="true" />}
    </Component>
  )
}

function DockLabel({ children, className = '', isHovered }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isHovered) return
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1)
    })
    return () => unsubscribe()
  }, [isHovered])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.9 }}
          animate={{ opacity: 1, y: -10, scale: 1 }}
          exit={{ opacity: 0, y: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DockIcon({ children, className = '' }) {
  return <div className={`dock-icon ${className}`}>{children}</div>
}

export function MagnificationDock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 68,
  distance = 180,
  panelHeight = 56,
  dockHeight = 110,
  baseItemSize = 44,
}) {
  const mouseX = useMotionValue(Infinity)
  const isHovered = useMotionValue(0)

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + 18),
    [dockHeight, magnification]
  )
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  return (
    <motion.div
      style={{ height }}
      className="dock-wrapper flex max-w-full items-end justify-center"
    >
      <motion.div
        onMouseMove={(e) => {
          isHovered.set(1)
          mouseX.set(e.clientX)
        }}
        onMouseLeave={() => {
          isHovered.set(0)
          mouseX.set(Infinity)
        }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => {
          if (item.isDivider) {
            return <div key={`divider-${index}`} className="dock-divider" />
          }

          return (
            <DockItem
              key={typeof item.label === 'string' ? item.label : index}
              onClick={item.onClick}
              href={item.href}
              download={item.download}
              target={item.target}
              rel={item.rel}
              ariaLabel={typeof item.label === 'string' ? item.label : undefined}
              className={item.className || ''}
              isActive={item.isActive}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              {item.label && <DockLabel>{item.label}</DockLabel>}
            </DockItem>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default MagnificationDock

