import React from 'react'
import { useAtom } from 'jotai'
import { updateFlagAtom, todoAtom, doingAtom, doneAtom, indexAtom, selectedOptionAtom, baseSelectedOptionAtom } from '../store/atoms'

export default function Tasks({ setUpdateConfirmTaskFlag }) {
  const [todos, setTodos] = useAtom(todoAtom)
  const [doings, setDoings] = useAtom(doingAtom)
  const [dones, setDones] = useAtom(doneAtom)
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom)
  const [baseSelectedOption, setBaseSelectedOption] = useAtom(baseSelectedOptionAtom)
  const [index, setIndex] = useAtom(indexAtom)
  const [updateFlag, setUpdateFlag] = useAtom(updateFlagAtom)
  
  const type = selectedOption === 'todo' ? todos : selectedOption === 'doing' ? doings : dones
  const prevType = baseSelectedOption === 'todo' ? todos : baseSelectedOption === 'doing' ? doings : dones
  const setType = selectedOption === 'todo' ? setTodos : selectedOption === 'doing' ? setDoings : setDones
  const setPrevType = baseSelectedOption === 'todo' ? setTodos : baseSelectedOption === 'doing' ? setDoings : setDones
  
  function handleTodo(todo, i) {
    setSelectedOption('todo')
    setBaseSelectedOption('todo')
    setIndex(i)
    setUpdateFlag(true)
    setUpdateConfirmTaskFlag(true)
  }

  function handleDoing(doing, i) {
    setSelectedOption('doing')
    setBaseSelectedOption('doing')
    setIndex(i)
    setUpdateFlag(true)
    setUpdateConfirmTaskFlag(true)
  }
  
  function handleDone(done, i) {
    setSelectedOption('done')
    setBaseSelectedOption('done')
    setIndex(i)
    setUpdateFlag(true)
    setUpdateConfirmTaskFlag(true)
  }

  function deleteTask(e, tipe, i) {
    e.stopPropagation()
    if(tipe.stats === 'todo') {
      setUpdateFlag(false)
      setUpdateConfirmTaskFlag(false)
      const newArray = [...todos]
      newArray.splice(i, 1)
      setTodos(newArray)
    } else if( tipe.stats === 'doing') {
      setUpdateFlag(false)
      setUpdateConfirmTaskFlag(false)
      const newArray = [...doings]
      newArray.splice(i, 1)
      setDoings(newArray)
    } else {
      setUpdateFlag(false)
      setUpdateConfirmTaskFlag(false)
      const newArray = [...dones]
      newArray.splice(i, 1)
      setDones(newArray)
    }
  }

  function handleDrag(tipe, i) {
    setIndex(i)
    setBaseSelectedOption(tipe)
  }

  function handleDropTodo() {
    if(baseSelectedOption !== 'todo') {
      const oldArray = [...prevType]
      const elementToBeAdded = oldArray.splice(index, 1)
      setPrevType(oldArray)

      const newArray = [...todos]
      elementToBeAdded[0].stats = 'todo'
      elementToBeAdded[0].subtasks.map(item => item.completed = false)
      newArray.push(...elementToBeAdded)
      setTodos(newArray)
    }
  }

  function handleDropDoing() {
    if(baseSelectedOption !== 'doing') {
      const oldArray = [...prevType]
      const elementToBeAdded = oldArray.splice(index, 1)
      setPrevType(oldArray)

      const newArray = [...doings]
      elementToBeAdded[0].stats = 'doing'
      if(elementToBeAdded[0].subtasks.length === 0) {
        elementToBeAdded[0].subtasks.push({writing: '', completed: false}, {writing: '', completed: true})
      } else if(elementToBeAdded[0].subtasks.length === 1) {
        elementToBeAdded[0].subtasks.push({writing: '', completed: !elementToBeAdded[0].subtasks[0].completed})
      } else{
        elementToBeAdded[0].subtasks[0].completed = true
        elementToBeAdded[0].subtasks[1].completed = false}
      newArray.push(...elementToBeAdded)
      setDoings(newArray)
    }
  }

  function handleDropDone() {
    if(baseSelectedOption !== 'done') {
      const oldArray = [...prevType]
      const elementToBeAdded = oldArray.splice(index, 1)
      setPrevType(oldArray)

      const newArray = [...dones]
      elementToBeAdded[0].stats = 'done'
      elementToBeAdded[0].subtasks.map(item => item.completed = true)
      newArray.push(...elementToBeAdded)
      setDones(newArray)
    }
  }

  function handleDragOver(e, tipe) {
    e.preventDefault()
    console.log(`inside ${tipe}`)
  }

  return (
    <main className='sm:grid sm:grid-cols-3'>
      <div onDrop={(e) => handleDropTodo(e)} onDragOver={(e) => handleDragOver(e, 'todo')} className='mx-3'>
        <div className='flex items-center pt-2 sm:pt-0'>
          <div className="w-3 h-3 rounded-full bg-sky-400 mr-1"></div>
          <h1 className='text-dimColor'>TODO({todos.length})</h1>
        </div>
        {todos.length > 0 && todos.map((todo, i) => {
          return (<div draggable onDragStart={() => handleDrag('todo', i)} onClick={() => handleTodo(todo, i)} className={'flex justify-between bg-mainColor rounded-md shadow-lg my-3 text-mainTextColor cursor-pointer hover:bg-btnColor'} key={i}>
              <div>
              <h1 className='text-lg font-bold p-3'>{todo.title}</h1>
              <p className='text-gray-400 pl-3 pb-3'>{`0 of ${todo.subtasks.length} subtasks`}</p>
              </div>
              <button onClick={(e) => deleteTask(e, todo, i)} className='px-4 my-5 mr-10 rounded hover:bg-red-800'>DEL</button>
            </div>)
        })}
      </div>

      <div onDrop={(e) => handleDropDoing(e)} onDragOver={(e) => handleDragOver(e, 'doing')} className='mx-3'>
      <div className='flex items-center'>
          <div className="w-3 h-3 rounded-full bg-purple-400 mr-1"></div>
          <h1 className='text-dimColor'>DOING({doings.length})</h1>
        </div>
        {doings.length > 0 && doings.map((doing, i) => {
          return (<div draggable onDragStart={() => handleDrag('doing', i)} onClick={() => handleDoing(doing, i)} className='flex justify-between bg-mainColor rounded-md shadow-lg my-3 text-mainTextColor cursor-pointer hover:bg-btnColor' key={i}>
              <div>
                <h1 className='text-lg font-bold p-3'>{doing.title}</h1>
                <p className='text-gray-400 pl-3 pb-3'>{`${doing.subtasks.filter(subtask => subtask.completed).length} of ${doing.subtasks.length} subtasks`}</p>
              </div>
              <button onClick={(e) => deleteTask(e, doing, i)} className='px-4 my-5 mr-10 rounded hover:bg-red-800'>DEL</button>
            </div>)
        })}
      </div>
      <div onDrop={(e) => handleDropDone(e)} onDragOver={(e) => handleDragOver(e, 'done')} className='mx-3 pb-1'>
      <div className='flex items-center'>
          <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
          <h1 className='text-dimColor'>DONE({dones.length})</h1>
        </div>
        {dones.length > 0 && dones.map((done, i) => {
          return (<div draggable onDragStart={() => handleDrag('done', i)} onClick={() => handleDone(done, i)} className='flex justify-between bg-mainColor rounded-md shadow-lg my-3 text-mainTextColor cursor-pointer hover:bg-btnColor' key={i}>
              <div>
                <h1 className='text-lg font-bold p-3'>{done.title}</h1>
                <p className='text-gray-400 pl-3 pb-3'>{`${done.subtasks.length} of ${done.subtasks.length} subtasks`}</p>
              </div>
              <button onClick={(e) => deleteTask(e, done, i)} className='px-4 my-5 mr-10 rounded hover:bg-red-800'>DEL</button>
            </div>)
        })}
      </div>
    </main>
  )
}
