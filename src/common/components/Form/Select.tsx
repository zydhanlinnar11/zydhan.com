import { Listbox, Transition } from '@headlessui/react'
import React, { Dispatch, FC, Fragment, SetStateAction } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

type Item = {
  id: any
  name: string
}

type Props = {
  items: Item[]
  selected: Item
  setSelected: Dispatch<SetStateAction<Item>>
}

const Select: FC<Props> = ({ selected, setSelected, items }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full border border-white/[0.24] rounded-md shadow-sm px-4 py-2 text-left cursor-default focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none">
              <span className="flex items-center">
                <span className="block truncate">{selected.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-gray-900 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-white/[0.24] ring-opacity-5 overflow-auto focus:outline-none">
                {items.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-3 pr-9 ${
                        active ? 'text-white bg-blue-600/30' : 'text-white'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span className="ml-3 block truncate">
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                              active ? 'text-white' : 'text-indigo-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Select
