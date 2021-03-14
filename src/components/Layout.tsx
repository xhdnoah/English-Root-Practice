import React from 'react'

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({ children }) => (
  <div className="h-screen w-full pb-4 flex flex-col items-center">{children}</div>
)

Layout.displayName = 'Layout'

export default Layout

export type LayoutProps = {}
