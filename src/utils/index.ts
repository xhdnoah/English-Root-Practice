export const isLegal = (val: string): boolean => /^[a-z_A-Z_._(_)_0-9'!,'?-]$/.test(val)

export const splitWord = (str: string, separator: string | RegExp): string[] => {
  if (str === '' || separator === '') {
    return []
  }

  const separatorIndex = str.search(separator)

  if (separatorIndex === -1) {
    return []
  }

  return [str.slice(0, separatorIndex), str.slice(separatorIndex + 1, -1)]
}

export const searchForRoot = (word: string, root: string): number[] => {
  const indexOfRoot = word.indexOf(root)
  if (indexOfRoot === -1) {
    return [-1]
  }
  return [indexOfRoot, indexOfRoot + root.length]
}

export const stripHTMLTag = (str: string): string => {
  return str.replace(/(<([^>]+)>)/gi, "")
}

export interface IExampleData {
  example: string,
  frequency: number
}

export const popTheLastNumber = (str: string): IExampleData => {
  const matchNumber = str.match(/\d+/)
  if (matchNumber == null) {
    return {
      example: str,
      frequency: Infinity
    }
  }
  return {
    example: str.replace(/[0-9★]/g, '').trim(),
    frequency: parseInt(matchNumber.pop()!)
  }
}
