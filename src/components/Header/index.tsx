import React from 'react'

const Header: React.FC = ({ children }) => {
  return (
    <nav className="w-full container mx-auto px-10 py-6">
      <div className="w-full flex items-center justify-between">
        <div className="flex bg-white dark:bg-gray-900" transition-colors duration-300>
          {children}
        </div>
      </div>
    </nav>
  )
}

export default Header
