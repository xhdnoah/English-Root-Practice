import React from 'react'

const Main: React.FC = ({ children }) => {
  return (
    <div className="container h-full mx-auto pb-20 flex flex-col flex-1 items-center justify-content">{children}</div>
  )
}

export default Main
