import React from 'react'
import { ModeToggle } from './theme-toggle'

function Appbar() {
  return (
    <div className='flex flex-row justify-between m-4 w-full'>
      <div className="text-2xl md:text-3xl md:leading-tight tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-800 dark:from-white dark:via-neutral-200 dark:to-neutral-300">
        Cryptic
      </div>
      <div>
        <ModeToggle />
      </div>

    </div>
  )
}

export default Appbar 
