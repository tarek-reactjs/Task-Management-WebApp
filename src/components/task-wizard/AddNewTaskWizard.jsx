import React, {useEffect, useRef } from 'react'
import Subtask from './Subtask'
import { clearFieldsAtom, subTasksAtom, todoAtom, doingAtom, doneAtom, selectedOptionAtom, baseSelectedOptionAtom, titleAtom ,descriptionAtom, indexAtom, updateFlagAtom } from '../../store/atoms'
import { useAtom, useSetAtom } from 'jotai'
import Button from '../Button'
import useOutsideComponent from '../../hooks/useOutsideComponent'
import useEscapeKey from '../../hooks/useEscapeKey'

export default function AddNewTaskWizard({ wizardFlag, setUpdateConfirmTaskFlag}) {
    const [todo, setTodo] = useAtom(todoAtom)
    const [doing, setDoing] = useAtom(doingAtom)
    const [done, setDone] = useAtom(doneAtom)
    const [title ,setTitle] = useAtom(titleAtom)
    const [description ,setDescription] = useAtom(descriptionAtom)
    const [subtasks, setSubtasks] = useAtom(subTasksAtom)
    const [selectedOption ,setSelectedOption] = useAtom(selectedOptionAtom)
    const [baseSelectedOption ,setBaseSelectedOption] = useAtom(baseSelectedOptionAtom)
    const [index, setIndex] = useAtom(indexAtom)
    const setClearFields = useSetAtom(clearFieldsAtom)
    const [updateFlag, setUpdateFlag] = useAtom(updateFlagAtom)
    const wrapperRef = useRef(null)
    const titleRef = useRef(null)
    const descRef = useRef(null)
    const subtasksRef = useRef([])

    const type = selectedOption === 'todo' ? todo : selectedOption === 'doing' ? doing : done
    const prevType = baseSelectedOption === 'todo' ? todo : baseSelectedOption === 'doing' ? doing : done
    const setType = selectedOption === 'todo' ? setTodo : selectedOption === 'doing' ? setDoing : setDone
    const setPrevType = baseSelectedOption === 'todo' ? setTodo : baseSelectedOption === 'doing' ? setDoing : setDone

    useEffect(() => {
        updateFlag ? (titleRef.current.value = type[index].title) &&
        (descRef.current.value = type[index].description) :
        setClearFields()
    }, [])

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }
    
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }
    
    function addSubtask(e) {
        e.preventDefault()
        if(updateFlag) {
            const newArray = [...type]
            newArray[index].subtasks.push({
                writing: '',
                completed: selectedOption === 'done' ? true : false
            })
            setType(newArray)
        } else {
            setSubtasks(prevSubtasks => [...prevSubtasks, {
                writing: '',
                completed: false
            }])
            const newArray = [...type]
            newArray[index].subtasks.push({
                writing: '',
                completed: selectedOption === 'done' ? true : false
            })
            setType(newArray)
        }
    }

    function createTask(e) {
        e.preventDefault()
        selectedOption === 'todo' ?
        subtasksRef.current.value && subtasksRef.current.value.map(subtask => {
            return subtask.completed = false
        }) : selectedOption === 'done' ?
        subtasksRef.current.value && subtasksRef.current.value.map(subtask => {
            return subtask.completed = true
        }) : subtasksRef.current.value && subtasksRef.current.value.length === 1 ?
        setSelectedOption('todo') :
        subtasksRef.current.value && (subtasksRef.current.value[0].completed = true)
        setType(prevState => {
            return [...prevState, {
                title: titleRef.current.value,
                description: descRef.current.value,
                subtasks,
                stats: selectedOption
            }]
        })
        setIndex(type.length)
        setBaseSelectedOption(selectedOption)
        setUpdateConfirmTaskFlag(true)
        wizardFlag(false)
    }
    
    function updateTask(e) {
        e.preventDefault()
        if(selectedOption !== 'done' && !type[index].subtasks.length) {
            const oldArray = [...prevType]
            oldArray.splice(index, 1)
            setPrevType(oldArray)

            const newArray = [...done]
            newArray.push({
                title: titleRef.current.value,
                description: descRef.current.value,
                subtasks: subtasksRef.current.value,
                stats: 'done'
            })
            setDone(newArray)
        } else if(selectedOption !== baseSelectedOption) {
            const oldArray = [...prevType]
            oldArray.splice(index, 1)
            setPrevType(oldArray)
    
            const newArray = [...type]
            newArray.push({
                title: titleRef.current.value,
                description: descRef.current.value,
                subtasks: subtasksRef.current.value,
                stats: selectedOption
            })
            setType(newArray)
        } else {
            const array = [...type]
            array.splice(index, 1, {
                title: titleRef.current.value,
                description: descRef.current.value,
                subtasks: subtasksRef.current.value,
                stats: selectedOption
            })
            setType(array)
        }
        wizardFlag(false)
        setUpdateFlag(false)
    }
    
    useOutsideComponent(wrapperRef, () => wizardFlag(false))
    useEscapeKey(wrapperRef, () => wizardFlag(false))

  return (
    <div ref={wrapperRef} className='bg-mainColor absolute top-0 left-0 w-full h-full z-10 p-8 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-1/2 sm:min-h-1/2 sm:h-5/6 sm:overflow-y-auto sm:rounded sm:shadow-lg'>
        <h1 className='text-mainTextColor text-lg mb-4'>Add New Task</h1>
        <form action="#">
            <div className='mb-4'>
                <label htmlFor="title" className='block text-mainTextColor mb-1'>
                    Title
                </label>
                <input type="text" ref={titleRef} onChange={(e) => handleTitleChange(e)} id='title' name='title' placeholder='e.g. Take coffee break' className='bg-mainColor appearance-none border border-dimColor rounded w-full p-2 text-mainTextColor leading-tight shadow-md focus:outline-none focus:shadow-lg placeholder-dimColor::placeholder text-sm'/>
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-mainTextColor mb-1">
                    Discription
                </label>
                <textarea ref={descRef} onChange={(e) => handleDescriptionChange(e)} id="description" name="discription" placeholder={`e.g. It's always good to take a break. This 15 minutes break will charge the batteries a little.`} className="appearance-none bg-mainColor border border-dimColor rounded w-full p-2 text-mainTextColor leading-tight shadow-md focus:outline-none focus:shadow-lg placeholder-dimColor::placeholder text-sm"></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-mainTextColor mb-1">
                    Subtasks
                </label>
                <Subtask
                    subtasksRef = {subtasksRef}
                />
            </div>
            <div className='mb-4'>
                <button onClick={(e) => addSubtask(e)} className='w-full bg-white text-btnColor text-xs font-bold opacity-100 hover:opacity-75 transition-colors duration-200 py-3 rounded-full shadow-md'>+Add New Subtask</button>
            </div>
            {/* {!updateFlag && <TaskType />} */}
            <div className='mb-4'>
                {updateFlag ? <Button
                    textMobile = 'Confirm'
                    textTabletDesktop = 'confirm'
                    className='w-full'
                    onClick={(e) => updateTask(e)}
                /> : <Button
                textMobile = 'Create Task'
                textTabletDesktop = 'Create Task'
                className='w-full'
                onClick={createTask}
            />}
            </div>
        </form>
    </div>
  )
}