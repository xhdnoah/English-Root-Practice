import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PronunciationSwitcher from './PronunciationSwitcher'
import { SwitcherStateType, SwitcherDispatchType } from '../hooks/useSwitcherState'

export type SwitcherPropsType = {
  state: SwitcherStateType
  dispatch: SwitcherDispatchType
}

const Switcher: React.FC<SwitcherPropsType> = ({ state, dispatch }) => {
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="group relative">
        <button
          className={`${state.sound ? 'text-indigo-400' : 'text-gray-400'} text-lg focus:outline-none`}
          onClick={(e) => {
            dispatch('sound')
            e.currentTarget.blur()
          }}
        >
          <FontAwesomeIcon icon={state.sound ? 'volume-up' : 'volume-mute'} fixedWidth />
        </button>
        <div className="invisible group-hover:visible absolute top-full left-1/2 w-44 -ml-20 pt-2 flex items-center justify-center">
          <span className="py-1 px-3 text-gray-500 dark:text-gray-400 text-xs">开关声音</span>
        </div>
      </div>
      <div className="group relative">
        <button
          className={`text-indigo-400 text-lg focus:outline-none`}
          onClick={(e) => {
            dispatch('darkMode')
            e.currentTarget.blur()
          }}
        >
          <FontAwesomeIcon icon={state.darkMode ? 'moon' : 'sun'} fixedWidth />
        </button>
        <div className="invisible group-hover:visible absolute top-full left-1/2 w-44 -ml-20 pt-2 flex items-center justify-center">
          <span className="py-1 px-3 text-gray-500 dark:text-gray-400 text-xs">开关深色模式（Ctrl + D）</span>
        </div>
      </div>
    </div>
  )
}

export { Switcher, PronunciationSwitcher }
