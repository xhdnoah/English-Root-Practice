import React from 'react'
import { useRootContext } from '../../context'
import { searchForRoot } from 'utils'
import Letter from '../Letter'

const Word: React.FC<WordProps> = ({ word }) => {
  const {
    rootData: { root },
  } = useRootContext()
  const [startIndex, endIndex] = searchForRoot(word, root)
  return (
    <div className="text font-sans text-lg">
      {word.split('').map((l, index) => {
        return (
          <Letter
            key={`${index}-${l}`}
            letter={l}
            state={startIndex <= index && index < endIndex ? 'correct' : 'normal'}
          />
        )
      })}
    </div>
  )
}

type WordProps = {
  word: string
}

export default Word
