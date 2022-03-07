import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useNextPath = () => {
  const [nextPath, setNextPath] = useState('')
  const router = useRouter()

  useEffect(() => {
    const nextPath = router.query.next
    if (typeof nextPath === 'string') setNextPath(nextPath)
  }, [router.query.next])

  return nextPath
}

export default useNextPath
