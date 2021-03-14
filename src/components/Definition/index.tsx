import React from 'react'

const Definition: React.FC<DefinitionProps> = ({ definition }) => {
  return <div className="pt-5 pb-4 text-lg font-sans text-center dark: text-white duration-300">{definition}</div>
}

export type DefinitionProps = { definition: string }
export default React.memo(Definition)
