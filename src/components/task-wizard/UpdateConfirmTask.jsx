import React, { useRef, useMemo } from 'react'
import TaskType from './TaskType'
import { titleAtom, descriptionAtom, indexAtom, todoAtom, doingAtom, doneAtom, selectedOptionAtom, baseSelectedOptionAtom, updateFlagAtom } from '../../store/atoms'
import { useAtomValue, useAtom } from 'jotai'
import Button from '../Button'
import useEscapeKey from '../../hooks/useEscapeKey'
import useOutsideComponent from '../../hooks/useOutsideComponent'

export default function UpdateConfirmTask({ setUpdateConfirmTaskFlag, setWizardPop }) {
  const [title, setTitle] = useAtom(titleAtom)
  const [description, setDescription] = useAtom(descriptionAtom)
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom)
  const baseSelectedOption = useAtomValue(baseSelectedOptionAtom)
  const index = useAtomValue(indexAtom)
  const [todo, setTodo] = useAtom(todoAtom)
  const [doing, setDoing] = useAtom(doingAtom)
  const [done, setDone] = useAtom(doneAtom)
  const [updateFlag, setUpdateFlag] = useAtom(updateFlagAtom)
  const wrapperRef = useRef(null)

  const type = selectedOption === 'todo' ? todo : selectedOption === 'doing' ? doing : done
  const prevType = baseSelectedOption === 'todo' ? todo : baseSelectedOption === 'doing' ? doing : done
  const setType = selectedOption === 'todo' ? setTodo : selectedOption === 'doing' ? setDoing : setDone
  const setPrevType = baseSelectedOption === 'todo' ? setTodo : baseSelectedOption === 'doing' ? setDoing : setDone
    
    function handleCheckboxChange(e, i) {
      const prev = [...prevType]
      prev[index].subtasks[i].completed = e.target.checked
      setPrevType(prev)
    }

    function onClick() {
      if((type[index] == null) || (!type[index].subtasks.length && selectedOption == 'done')) {
        setUpdateFlag(false)
        setUpdateConfirmTaskFlag(false)
      } else if(type[index].subtasks.every(subtask => !subtask.completed) && selectedOption !== 'todo') {
        const oldArray = [...type]
        const elementToBeAdded = oldArray.splice(index, 1)
        setType(oldArray)

        const newArray = [...todo]
        elementToBeAdded[0].stats = 'todo'
        newArray.push(...elementToBeAdded)
        setTodo(newArray)
      } else if(type[index].subtasks.some(subtask => subtask.completed) &&
        type[index].subtasks.some(subtask => !subtask.completed) &&
        selectedOption !== 'doing') {
          const oldArray = [...type]
          const elementToBeAdded = oldArray.splice(index, 1)
          setType(oldArray)

          const newArray = [...doing]
          elementToBeAdded[0].stats = 'doing'
          newArray.push(...elementToBeAdded)
          setDoing(newArray)
        } else if((type[index].subtasks.every(subtask => subtask.completed) && selectedOption !== 'done') ||
        (!type[index].subtasks.length && selectedOption !== 'done')) {
          const oldArray = [...type]
          const elementToBeAdded = oldArray.splice(index, 1)
          setType(oldArray)

          const newArray = [...done]
          elementToBeAdded[0].stats = 'done'
          newArray.push(...elementToBeAdded)
          setDone(newArray)
          } 

      setUpdateFlag(false)
      setUpdateConfirmTaskFlag(false)
    }

    function handleUpdate() {
      setUpdateFlag(true)
      setUpdateConfirmTaskFlag(false)
      setWizardPop(true)
    }

    useOutsideComponent(wrapperRef, () => setUpdateConfirmTaskFlag(false))
    useEscapeKey(wrapperRef, () => setUpdateConfirmTaskFlag(false))
    
  return (
    <div ref={wrapperRef} className='bg-mainColor absolute top-0 left-0 w-full h-full z-10 p-8 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-1/2 sm:min-h-1/2 sm:h-3/4 sm:overflow-y-auto sm:rounded sm:shadow-lg'>
      <div className='overflow-hidden whitespace-normal mb-4'>
        <h1 className='text-mainTextColor text-lg font-bold'>{updateFlag ? useMemo(() => type[index].title, []) : title}</h1>
      </div>
      <div className='overflow-hidden whitespace-normal mb-4'>
        <p className='text-dimColor'>{updateFlag ? useMemo(() => type[index].description, []) : description}</p>
      </div>
      <div>
        <h1 className='text-mainTextColor font-bold mb-2'>
            Subtasks
        </h1>
        <div className='flex flex-col gap-2 mb-4 shadow-md'>
            {
                //useMemo(() => type, [])[index].subtasks.map((subtask, i) => {
                  prevType[index].subtasks && prevType[index].subtasks.map((subtask, i) => {
                  return (
                    <div key={i} className='flex items-center bg-secondaryColor rounded p-4'>
                        <input type="checkbox" checked={subtask.completed} onChange={(e) => handleCheckboxChange(e, i)} className='h-4 w-4 bg-mainColor text-mainColor border border-dimColor rounded cursor-pointer'/>
                        <h1 className={`ml-4 ${subtask.completed ? 'line-through text-dimColor' : 'text-mainTextColor'}`}>{subtask.writing}</h1>
                    </div>
                )
              })
            }
        </div>
      </div>
      <TaskType
        //updateFlag = {updateFlag}
      />
      <Button
        textMobile= 'COOL!'
        textTabletDesktop= 'COOL!'
        className='w-full mb-2'
        onClick={onClick}
      />
      <Button
        textMobile= 'Update'
        textTabletDesktop= 'Update'
        className='w-full'
        onClick={handleUpdate}
      />
    </div>
  )
}