import React from 'react'
import Button from './Button'
import { titleAtom, descriptionAtom, subTasksAtom, updateFlagAtom } from '../store/atoms'
import { useSetAtom, useAtom } from 'jotai'

export default function NavBar({ wizardFlag}) {
  const [title, setTitle] = useAtom(titleAtom)
  const setDescription = useSetAtom(descriptionAtom)
  const setSubtasks = useSetAtom(subTasksAtom)
  const setUpdateFlag = useSetAtom(updateFlagAtom)

  const props = {
    textMobile: '+',
    textTabletDesktop: '+Add New Task',
    className: 'px-6 shadow-stone-700'
  }

  function onClick() {
    setTitle('')
    setDescription('')
    setSubtasks([{writing: '', completed: false}, {writing: '', completed: false}])
    setUpdateFlag(false)
    wizardFlag(true)
  }
  
  return (
    <nav className='flex justify-between bg-mainColor text-mainTextColor p-8'>
        <h2 className='text-base font-bold sm:text-xl md:text-2xl'>Platform Launch</h2>
        <Button
          {...props}
          onClick = {onClick}
          //onClick = {() => onClick()}
          />
    </nav>
  )
}
