import React from 'react'

const PlaceholderListItem = () => {
  return (
    <li className="relative flex flex-col gap-y-5 md:flex-row md:gap-x-12 justify-between py-6 after:content-[''] after:h-px after:w-full after:block after:absolute after:top-full dark:after:bg-white/[0.24] hover:scale-[1.02] duration-150">
      <div className="flex flex-col gap-y-3 grow">
        <p className="text-xl font-medium h-4 mb-3 w-48 bg-gray-700 rounded-lg animate-pulse"></p>
        <p className="dark:text-gray-300 h-3 w-full bg-gray-700 rounded-lg animate-pulse mt-3"></p>
      </div>
      <p className="md:min-w-[6rem] h-3 bg-gray-700 rounded-lg animate-pulse"></p>
    </li>
  )
}

export default PlaceholderListItem
