import React from 'react'
import { useAtom } from 'jotai'
import { selectedOptionAtom } from '../../store/atoms'

export default function TaskType({  }) {
    const [selectedOption ,setSelectedOption] = useAtom(selectedOptionAtom)
        
    function handleSelectChange(e) {
        setSelectedOption(e.target.value)
    }
    
  return (
    <div className="mb-4">
        <label className="block text-mainTextColor mb-1" htmlFor="category">
            Status
        </label>
        <select id="category" name="category" value={selectedOption} onChange={(e) => handleSelectChange(e)} className="block appearance-none w-full bg-mainColor border border-dimColor text-mainTextColor p-2 rounded leading-tight shadow-md focus:shadow-lg focus:outline-none focus:bg-mainColor focus:border-dimColor">
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
        </select>
    </div>
  )
}
