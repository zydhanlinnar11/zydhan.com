import { useEffect, useState } from 'react'

const useInitialRenderComplete = () => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false)
  useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true)
  }, [])

  return { initialRenderComplete }
}

export default useInitialRenderComplete
