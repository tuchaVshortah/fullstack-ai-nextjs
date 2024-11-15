import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen relative">
      <aside className="absolute top-0 left-0 h-full w-[200px] border border-r border-black/10">
        Mood
      </aside>
      <div className="ml-[200px]">
        <header className="relative h-[60px] border border-b border-black/10">
          hello
        </header>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
