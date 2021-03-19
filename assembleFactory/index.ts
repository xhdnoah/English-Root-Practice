import * as rootList from './test.json'
import { splitWord, stripHTMLTag, popTheLastNumber, IExampleData } from '../src/utils/index'
import Mdict from 'js-mdict'

const fs = require('fs')
const natural = require('natural')
const checkWord = require('check-word')
const englishWord = checkWord('en')

const stemmer = natural.LancasterStemmer

const mdict = new Mdict('./english-root.mdx')

const newRootList = rootList.map((rootData) => {
  const { root, examples } = rootData
  let newStemmers: string[] = []
  let exampleDatas: IExampleData[] = []

  const [word] = splitWord(typeof examples === 'string' ? examples : examples[0], '[(|（]')
  const { definition } = mdict.lookup(word)

  definition.split(/(?:<br>)?\r\n/).forEach((ex) => {
    let index = exampleDatas.length
    const example = stripHTMLTag(ex)
    const exampleWord = example.split(/,|\s/)[0].trim()
    if (
      exampleWord.includes(root) &&
      !newStemmers.includes(stemmer.stem(exampleWord))
      // && englishWord.check(exampleWord)
    ) {
      const exampleData = popTheLastNumber(example)
      newStemmers.push(stemmer.stem(exampleWord))
      if (exampleDatas.length === 0) {
        exampleDatas.push(exampleData)
      } else {
        for (let i = 0; i <= exampleDatas.length; i++) {
          if (exampleDatas[i].frequency > exampleData.frequency) {
            index = i
            break;
          }
        }
      }
      exampleDatas.splice(index,0, exampleData)
    }
  })

  const newExamples = exampleDatas.map((exampleData) => {
    return exampleData.example
  })

  return { ...rootData, newExamples }
})

fs.writeFile('./test.json', JSON.stringify(newRootList), (err) => {
  console.log(err)
})

// parcel build mdict.js --out-dir mdict --no-minify --target main && node mdict/mdict.js && prettier --write ./test.json
