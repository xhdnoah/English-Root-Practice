import React, { useCallback } from 'react'
import Header from 'components/Header'
import Main from 'components/Main'
import { Switcher, PronunciationSwitcher } from './Switcher'
import usePronunciation from './hooks/usePronunciations'
import useSwitcherState from './hooks/useSwitcherState'
import Layout from '../../components/Layout'
import RootComp from '../../components/RootComp'
import { RootContextProvider } from 'context'

const App: React.FC = () => {
  const [switcherState, switcherStateDispatch] = useSwitcherState({ phonetic: false })
  const [pronunciation, pronunciationDispatch] = usePronunciation()

  const changePronunciation = useCallback(
    (state: string) => {
      pronunciationDispatch(state)
    },
    [pronunciationDispatch],
  )

  return (
    <>
      <Layout>
        <Header>
          <PronunciationSwitcher state={pronunciation.toString()} changePronunciationState={changePronunciation} />
          <Switcher state={switcherState} dispatch={switcherStateDispatch} />
        </Header>
        <Main>
          <RootContextProvider>
            <RootComp />
          </RootContextProvider>
        </Main>
      </Layout>
    </>
  )
}

export default App
