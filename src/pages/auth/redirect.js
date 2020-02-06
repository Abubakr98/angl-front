import { useState } from 'react'

export const useRedirect = () => {
  const [isRedirect, setIsRedirect] = useState(false)

  const handleIsRedirect = () => setIsRedirect(true)
  
  return [isRedirect, handleIsRedirect]
}