import React, { createContext, useContext, useState } from 'react'
import rootList from 'assets/english-root.json'
import { random } from 'lodash'

export const ROOT_NUMBERS = Object.keys(rootList).length

type TRoot = {
  root: string
  definition: string
  examples: string[]
}

type TRootContext = {
  rootData: TRoot
  order: number
  setRoot: Function
}

const RootContext = createContext<TRootContext>({} as TRootContext)

export const RootContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [order, setOrder] = useState(0)
  const [rootData, setRootData] = useState<TRoot>({
    root: 'a',
    definition: '一【前缀】用于加强语气,不【后缀】表示抽象名词',
    examples: ['atom（n 原子(a不+tom=不能在切割的小东西=原子)）', 'acentric(a + centric -> 离心的）'],
  })
  const setRoot = () => {
    const order = random(0, ROOT_NUMBERS)
    setOrder(order)
    const examples = rootList[order].examples
    const rootData = {
      ...rootList[order],
      examples: typeof examples === 'string' ? [examples] : examples,
    }
    setRootData(rootData)
  }
  return <RootContext.Provider value={{ rootData, order, setRoot }}>{children}</RootContext.Provider>
}

export const useRootContext = () => useContext(RootContext)
