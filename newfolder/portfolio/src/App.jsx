import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import ErrorBoundary from './components/ErrorBoundary'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  useSmoothScroll()

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <CustomCursor />
        <Toaster position="bottom-right" theme="dark" richColors closeButton />
        <Preloader ready={ready} onDone={onReady} />
        <Home ready={ready} />
      </MotionConfig>
    </ErrorBoundary>
  )
}
