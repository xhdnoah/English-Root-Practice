import React, { useState, useEffect } from 'react'
import Example from 'components/Example'
import RootWord from 'components/RootWord'
import { useRootContext } from 'context'
import { isLegal } from 'utils/index'
import usePronunciationSound, { pronunce } from 'hooks/usePronunciation'
import { useRootState } from 'store/RootState'

const RootComp: React.FC = () => {
  const [isStart, setIsStart] = useState<boolean>(false)
  const [showExample, setShowExample] = useState<boolean>(false)
  const { pronunciation } = useRootState()
  const {
    rootData: { root, examples },
    order,
    setRoot,
  } = useRootContext()
  const [audioRef, setIsPlayed] = usePronunciationSound(examples)

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setShowExample(false)
        setIsPlayed(false)
        setRoot()
      }
    }

    if (showExample) {
      window.addEventListener('keydown', onKeydown)
    }
    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [showExample])

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (isLegal(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey) {
        setIsStart(true)
      }
    }

    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [isStart])

  const onFinish = () => {
    if (order === -1) {
      setIsStart(false)
    } else {
      setShowExample(true)
      pronunce[pronunciation] > 0 && audioRef.current.play()
    }
  }

  return (
    <div className="container h-full relative flex mx-auto flex-col items-center">
      <div className="h-1/3"></div>
      <RootWord key={`word-${root}-${order}`} onFinish={onFinish} isStart={isStart} />
      {!isStart && order === 0 && <div className="font-mono text-gray-400 mt-5">Try typing the root 'a'</div>}
      {showExample && <Example />}
    </div>
  )
}

export default RootComp
