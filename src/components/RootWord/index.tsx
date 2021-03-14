import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react'
import { useRootContext } from '../../context'
import Letter, { LetterState } from '../Letter'
import useSounds from 'hooks/useSounds'
import { isLegal } from 'utils/index'

const RootWord: React.FC<RootWordProps> = ({ isStart, onFinish }) => {
  const [inputWord, setInputWord] = useState('')
  const [stateList, setStateList] = useState<LetterState[]>([])
  const [isFinish, setIsFinish] = useState(false)
  const [hasWrong, setHasWrong] = useState(false)
  const [playKeySound, playBeepSound, playHintSound] = useSounds()
  const {
    rootData: { root: word, definition },
  } = useRootContext()

  const onKeydown = useCallback(
    (e) => {
      const char = e.key
      if (char === ' ') {
        e.preventDefault()
        setInputWord((val) => (val += '_'))
        playKeySound()
      }
      if (isLegal(char)) {
        setInputWord((val) => (val += char))
        playKeySound()
      } else if (char === 'Backspace') setInputWord((val) => val.substr(0, val.length - 1))
    },
    [playKeySound],
  )

  useEffect(() => {
    if (!isFinish) window.addEventListener('keydown', onKeydown)

    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [isFinish, onKeydown])

  useEffect(() => {
    if (isFinish) {
      playHintSound()
      onFinish()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinish, hasWrong])

  useEffect(() => {
    if (hasWrong) {
      playBeepSound()
      setTimeout(() => {
        setInputWord('')
        setHasWrong(false)
      }, 300)
    }
  }, [hasWrong, isFinish, playBeepSound])

  useLayoutEffect(() => {
    let hasWrong = false,
      wordLength = word.length,
      inputWordLength = inputWord.length
    const stateList: LetterState[] = []

    for (let i = 0; i < wordLength && i < inputWordLength; i++) {
      if (word[i] === inputWord[i]) {
        stateList.push('correct')
      } else {
        hasWrong = true
        stateList.push('wrong')
        setHasWrong(true)
        break
      }
    }

    if (!hasWrong && inputWordLength >= wordLength) {
      setIsFinish(true)
    }
    setStateList(stateList)
  }, [inputWord, word])

  return (
    <>
      <div className="pt-4 pb-1 text-7xl font-mono font-normal flex items-center justify-center">
        {word.split('').map((l, index) => {
          return <Letter key={`${index}-${l}`} letter={l} state={stateList[index]} />
        })}
      </div>
      <div className="font-mono dark:text-white">{definition}</div>
    </>
  )
}

export type RootWordProps = {
  isStart: boolean
  onFinish: Function
}

export default RootWord
