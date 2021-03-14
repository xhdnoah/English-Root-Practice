import React from 'react'

export type LetterState = 'normal' | 'correct' | 'wrong'

const Letter: React.FC<LetterProps> = ({ letter, state }) => {
  let stateClassName = ''

  const defaultClassName = 'text-gray-600 dark:text-white dark:text-opacity-80'
  switch (state) {
    case 'normal':
      stateClassName = defaultClassName
      break
    case 'correct':
      stateClassName = 'text-green-600 dark:text-green-400'
      break
    case 'wrong':
      stateClassName = 'text-red-600 dark:text-red-400'
      break
    default:
      stateClassName = defaultClassName
  }

  return (
    <span
      className={`m-0 p-0 text-7xl font-mono font-normal ${stateClassName}`}
      style={{ paddingRight: '.2rem', transitionDuration: '0ms' }}
    >
      {letter}
    </span>
  )
}

export default React.memo(Letter)

export type LetterProps = {
  letter: string
  state: LetterState
}
