import { atom } from "jotai"
import { atomWithStorage } from 'jotai/utils'

//localStorage.clear();
export const todoAtom = atomWithStorage('todo', [{
    title: 'Title one',
    description: 'some random text just for taking some space, another random text after the coma',
    subtasks: [{writing: 'random subtask', completed: false}, {writing: 'random subtask two', completed: false}],
    stats: 'todo'
}, {
    title: 'Title two',
    description: 'random paragrapgh since description need to be kind of long, so just writing random words',
    subtasks: [{writing: 'do task', completed: false}, {writing: 'do task two', completed: false}, {writing: 'do third task', completed: false}],
    stats: 'todo'
}, {
    title: 'Test title',
    description: 'random paragrapgh since description need to be kind of long, so just writing random words',
    subtasks: [{writing: 'do task', completed: false}, {writing: 'do task two', completed: false}, {writing: 'do third task', completed: false}],
    stats: 'todo'
}])

export const doingAtom = atomWithStorage('doing', [{
    title: 'Make coffee',
    description: 'obviously im not gonna describe how to make coffee in details, so just some random text',
    subtasks: [{writing: 'buy coffee', completed: true}, {writing: 'buy sugar', completed: false}],
    stats: 'doing'
}, {
    title: 'Make tea',
    description: 'obviously im not gonna describe how to make tea in details, so just some random text',
    subtasks: [{writing: 'buy tea', completed: true}, {writing: 'buy sugar', completed: false}, {writing: 'buy water boiler', completed: false}],
    stats: 'doing'
}, {
    title: 'Make milk tea',
    description: 'obviously im not gonna describe how to make milk tea in details, so just some random text, adding more text to the previous one',
    subtasks: [{writing: 'buy tea', completed: true}, {writing: 'buy sugar', completed: false}, {writing: 'buy milk', completed: false}],
    stats: 'doing'
}, {
    title: 'Make nespresso',
    description: 'I absolutely have no idea how to make nespresso and obviously im not gonna search how to make nespresso, so just some random text',
    subtasks: [{writing: 'buy coffee', completed: true}, {writing: 'buy sugar', completed: false}, {writing: 'buy milk', completed: false}],
    stats: 'doing'
}, {
    title: 'Make hot chocolate',
    description: 'obviously im not gonna describe how to make milk tea in details, so just some random text, adding more text to the previous one',
    subtasks: [{writing: 'buy chocolate', completed: true}, {writing: 'buy sugar', completed: false}],
    stats: 'doing'
}, {
    title: 'Make APP look goood',
    description: 'I do think the more tasks that I put in here the better lookin this app will look, so this is why this doings tasks is long, just some random text, adding more text to the previous one',
    subtasks: [{writing: 'print more text', completed: true}, {writing: 'print more tasks', completed: false}],
    stats: 'doing'
}])

export const doneAtom = atomWithStorage('done', [{
    title: 'Make orange juice',
    description: 'obviously im not gonna describe how to make orange juice in details, so just some random text',
    subtasks: [{writing: 'buy oranges', completed: true}, {writing: 'buy sugar', completed: true}],
    stats: 'done'
}, {
    title: 'Make ice lemon tea',
    description: 'obviously im not gonna describe how to make some ice lemon tea in details, so just some random text',
    subtasks: [{writing: 'buy tea', completed: true}, {writing: 'buy sugar', completed: true}, {writing: 'buy ice', completed: true}, {writing: 'buy a blender', completed: true}],
    stats: 'done'
}, {
    title: 'make pepsi',
    description: 'I dont think anyone makes pepsi, they just buy at the supermarket or something, just some random text, adding more text to the previous one',
    subtasks: [{writing: 'go out', completed: true}, {writing: 'go to the nearest supermarket', completed: true}, {writing: 'buy a pepsi bottle', completed: true}],
    stats: 'done'
}, {
    title: 'Make ice cream',
    description: 'I have no idea how to make ice cream, so just some random text',
    subtasks: [{writing: 'go out', completed: true}, {writing: 'buy icecream', completed: true}],
    stats: 'done'
}])

export const subTasksAtom = atom([{writing: '', completed: false}, {writing: '', completed: false}])
export const selectedOptionAtom = atom('todo')
export const baseSelectedOptionAtom = atom('')
export const titleAtom = atom('')
export const descriptionAtom = atom('')
export const indexAtom = atom(0)
export const wizardPopAtom = atom(false)
export const updateConfirmTaskFlagAtom = atom(false)
export const updateFlagAtom = atom(false)
export const lightModeAtom = atomWithStorage('lightMode', false)

export const createTaskAtom = atom((get) => ({
    title: get(titleAtom),
    description: get(descriptionAtom),
    subtasks: get(subTasksAtom),
    index: get(indexAtom)
  }))

  export const clearFieldsAtom = atom(
    () => '',
    (get, set) => {
      set(titleAtom, '')
      set(descriptionAtom, '')
      set(subTasksAtom, [{writing: '', completed: false}, {writing: '', completed: false}])
    }
  )