import './tailwind.css'
import React from 'react'
import { Provider } from 'jotai'
import { useAtom } from 'jotai'
import { wizardPopAtom, updateConfirmTaskFlagAtom, lightModeAtom } from './store/atoms'
import NavBar from './components/NavBar'
import Task from './components/Task'
import AddNewTaskWizard from './components/task-wizard/AddNewTaskWizard'
import UpdateConfirmTask from './components/task-wizard/UpdateConfirmTask'
import Toggle from './components/Toggle'

function App() {
  const [wizardPop, setWizardPop] = useAtom(wizardPopAtom)
  const [updateConfirmTaskFlag, setUpdateConfirmTaskFlag] = useAtom(updateConfirmTaskFlagAtom)
  const [lightMode, setLightMode] = useAtom(lightModeAtom)

  return (
    <Provider>
      <main className={`${lightMode && 'light'}`}>
        <Toggle
          enabled = {lightMode}
          setEnabled = {setLightMode}
         />
        <div className={'bg-secondaryColor'}>
          {wizardPop && <AddNewTaskWizard
            wizardFlag = {setWizardPop}
            setUpdateConfirmTaskFlag = {setUpdateConfirmTaskFlag}
            />
          }
          {updateConfirmTaskFlag && <UpdateConfirmTask
              setUpdateConfirmTaskFlag = {setUpdateConfirmTaskFlag}
              setWizardPop = {setWizardPop}
              />}
          <section className={`${(wizardPop || updateConfirmTaskFlag) && 'opacity-30'}`}>
            <NavBar
              wizardFlag = {setWizardPop}
              />
          </section>
          <section className={`${(wizardPop || updateConfirmTaskFlag) && 'hidden'} || ${(wizardPop || updateConfirmTaskFlag) && 'sm:block sm:opacity-30'}`}>
            <Task 
              setUpdateConfirmTaskFlag={setUpdateConfirmTaskFlag}
              />
          </section>
        </div>
      </main>
    </ Provider>
  )
}

export default App
