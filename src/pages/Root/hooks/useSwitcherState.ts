import { useState } from 'react'
import { useSetSoundState, useDarkMode } from 'store/RootState'

export type SwitcherStateType = {
  phonetic: boolean
  sound: boolean
  darkMode: boolean
}

export type SwitcherDispatchType = (type: string, newStatus?: boolean) => void

const useSwitcherState = (initialState: {
  phonetic: boolean
  darkMode?: boolean
}): [SwitcherStateType, SwitcherDispatchType] => {
  const [phonetic, setPhonetic] = useState(initialState.phonetic)
  const [sound, setSound] = useSetSoundState()
  const [darkMode, setDarkMode] = useDarkMode()

  const dispatch: SwitcherDispatchType = (type, newStatus) => {
    switch (type) {
      case 'phonetic':
        setPhonetic(newStatus ?? !phonetic)
        break
      case 'sound':
        setSound(newStatus ?? !sound)
        break
      case 'darkMode':
        setDarkMode(newStatus ?? !darkMode)
    }
  }
  return [{ phonetic, sound, darkMode }, dispatch]
}

export default useSwitcherState
