import React from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { updateFlagAtom, subTasksAtom, selectedOptionAtom, baseSelectedOptionAtom, indexAtom, todoAtom, doingAtom, doneAtom } from '../../store/atoms'

export default function Subtask({ subtasksRef }) {
  const [todo, setTodo] = useAtom(todoAtom)
  const [doing, setDoing] = useAtom(doingAtom)
  const [done, setDone] = useAtom(doneAtom)
  const selectedOption = useAtomValue(selectedOptionAtom)
  const baseSelectedOption = useAtomValue(baseSelectedOptionAtom)
  const index = useAtomValue(indexAtom)
  const [subtasks, setSubtasks] = useAtom(subTasksAtom)
  const updateFlag = useAtomValue(updateFlagAtom)

  React.useEffect(() => {
    updateFlag ? subtasksRef.current.value = type[index].subtasks : ''
    //setClearFields()
  }, [])
  const type = selectedOption === 'todo' ? todo : selectedOption === 'doing' ? doing : done
  const prevType = baseSelectedOption === 'todo' ? todo : baseSelectedOption === 'doing' ? doing : done
  const setType = selectedOption === 'todo' ? setTodo : selectedOption === 'doing' ? setDoing : setDone
  const setPrevType = baseSelectedOption === 'todo' ? setTodo : baseSelectedOption === 'doing' ? setDoing : setDone

    function handleChange(e, i) {
      if(updateFlag) {
        const newArray = [...type]
        newArray[index].subtasks[i].writing = e.target.value
        setType(newArray)
        subtasksRef.current.value = type[index].subtasks
      } else {
        const subtasksArray = [...subtasks]
        subtasksArray[i].writing = e.target.value
        setSubtasks(subtasksArray)
        
        const newArray = [...type]
        newArray[index].subtasks[i].writing = e.target.value
        setType(newArray)
      }
    }

    function handleRef(i) {
      subtasksRef.current.value[i]
    }

    function removeSubtask(i) {
      if(updateFlag) {
        const newArray = [...type]
      newArray[index].subtasks.splice(i, 1)
      setType(newArray)
      } else {const subtasksArray = [...subtasks]
        subtasksArray.splice(i, 1)
        setSubtasks(subtasksArray)
        const newArray = [...type]
        newArray[index].subtasks.splice(i, 1)
        setType(newArray)
      }
    }
    
  return (
    updateFlag ? subtasksRef.current.value && subtasksRef.current.value.map((subtask, i) => {
      return (
        <div className="flex mb-1" key={i}>
          <input type="text" ref={handleRef(i)} value={subtask.writing} onChange={(e) => handleChange(e, i)} name='subtasks' placeholder='e.g. Make coffee' className='bg-mainColor appearance-none border border-dimColor rounded w-full p-2 text-mainTextColor leading-tight shadow-md focus:outline-none focus:shadow-lg placeholder-dimColor::placeholder text-sm'/>
          <button onClick={() => removeSubtask(i)} className="bg-mainColor hover:bg-secondaryColor text-dimColor font-bold py-2 px-4 rounded-r" type="button">
            X
          </button>
        </div>
        )       
    }) : subtasks && subtasks.map((subtask, i) => {
      return (
        <div className="flex mb-1" key={i}>
          <input type="text" value={subtask.writing} onChange={(e) => handleChange(e, i)} name='subtasks' placeholder='e.g. Make coffee' className='bg-mainColor appearance-none border border-dimColor rounded w-full p-2 text-mainTextColor leading-tight shadow-md focus:outline-none focus:shadow-lg placeholder-dimColor::placeholder text-sm'/>
          <button onClick={() => removeSubtask(i)} className="bg-mainColor hover:bg-secondaryColor text-dimColor font-bold py-2 px-4 rounded-r" type="button">
            X
          </button>
        </div>
        )       
    })
  )
}