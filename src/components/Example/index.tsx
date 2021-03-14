import { useRootContext } from 'context'
import React from 'react'
import { splitWord } from 'utils/index'
import Word from './Word'

type Texample = {
  word: string
  definition: string
}

const Example: React.FC = () => {
  const {
    rootData: { examples },
  } = useRootContext()
  const exampleDic: Texample[] = []
  examples.forEach((el) => {
    const [word, definition] = splitWord(el, '[(|（]')
    exampleDic.push({ word, definition })
  })
  return (
    <div>
      {exampleDic.map(({ word, definition }) => (
        <>
          <Word word={word} />
          <div className="font-mono text-center dark:text-white">{definition}</div>
        </>
      ))}
    </div>
  )
}

export default Example
