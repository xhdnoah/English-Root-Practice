import { useRootState, PronunciationType } from 'store/RootState'
import { splitWord } from 'utils/index'
import { useEffect, useRef, useMemo, useState } from 'react'

const pronunciationApi = 'https://dict.youdao.com/dictvoice?audio='

export const pronunce: Record<PronunciationType, number> = {
  none: 0,
  uk: 1,
  us: 2,
}

export default function usePronunciationSound(words: string[]): any {
  const audioRef = useRef<HTMLAudioElement>()
  const { pronunciation } = useRootState()
  const [isPlayed, setIsPlayed] = useState<boolean>(false)

  const type = pronunce[pronunciation]

  const pronunciationUrls = useMemo(() => {
    return words.map((element) => {
      if (type === 0) {
        return ''
      }
      const [word] = splitWord(element, '[(|（]')
      return `${pronunciationApi}${word}&type=${type}`
    })
  }, [words, type])

  useEffect(() => {
    if (type > 0) {
      let index = 1
      audioRef.current = new Audio(pronunciationUrls![0])
      const audio = audioRef.current!
      const playSequence = (targetIndex?: number) => {
        const audioIndex = targetIndex || index
        if (audioIndex >= pronunciationUrls!.length) {
          setIsPlayed(true)
          return
        }
        audio.src = pronunciationUrls![audioIndex]
        audio.play()
        index = audioIndex + 1
      }
      audio.addEventListener('ended', () => {
        playSequence()
      })
      audio.addEventListener('error', () => playSequence(index + 1))
      isPlayed && audio.play()
      return () => {
        audio.pause()
        audio.removeEventListener('ended', () => playSequence())
      }
    }
  }, [pronunciationUrls])

  return [audioRef, setIsPlayed]
}
