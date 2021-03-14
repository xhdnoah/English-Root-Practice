import { useSetPronunciationState, PronunciationType } from 'store/RootState'

export type SwitcherDispatchType = (newStatus?: string) => void

const usePronunciation = (): [PronunciationType, SwitcherDispatchType] => {
  const [pronunciation, setPronunciation] = useSetPronunciationState()
  const dispatch: SwitcherDispatchType = (newStatus) => {
    switch (newStatus) {
      case 'uk':
        setPronunciation('uk')
        break
      case 'us':
        setPronunciation('us')
        break
      case 'none':
        setPronunciation('none')
        break
    }
  }

  return [pronunciation, dispatch]
}

export default usePronunciation
