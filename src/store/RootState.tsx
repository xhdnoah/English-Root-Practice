import React, { useCallback, useContext } from 'react'
import { useLocalStorage } from 'react-use'

export type PronunciationType = 'us' | 'uk' | 'none'

export type RootState = {
  sound: boolean
  pronunciation: PronunciationType
  darkMode: boolean
}

export type RootStateData = {
  state: RootState
  setState: (state: RootState) => void
}

const RootStateContext = React.createContext<RootStateData>({} as RootStateData)

export function useRootState(): RootState {
  const { state } = useContext(RootStateContext)
  return state
}

export function useSetSoundState(): [state: boolean, setSound: (state: boolean) => void] {
  const { state, setState } = useContext(RootStateContext)
  const setSound = useCallback((sound: boolean) => setState({ ...state, sound }), [state, setState])
  return [state.sound, setSound]
}

export function useSetPronunciationState(): [
  status: PronunciationType,
  setPronunciation: (state: PronunciationType) => void,
] {
  const { state, setState } = useContext(RootStateContext)
  const setPronunciation = useCallback((pronunciation: PronunciationType) => setState({ ...state, pronunciation }), [
    state,
    setState,
  ])
  return [state.pronunciation, setPronunciation]
}

export function useDarkMode(): [darkMode: boolean, setDarkMode: (state: boolean) => void] {
  const { state, setState } = useContext(RootStateContext)
  const setDarkMode = useCallback(
    (darkMode: boolean) => {
      setState({ ...state, darkMode })
      darkMode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
    },
    [state, setState],
  )
  return [state.darkMode, setDarkMode]
}

const defaultState: RootState = {
  sound: true,
  pronunciation: 'uk',
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
}

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, setState] = useLocalStorage<RootState>('state', defaultState)
  return <RootStateContext.Provider value={{ state: state!, setState }}>{children}</RootStateContext.Provider>
}
