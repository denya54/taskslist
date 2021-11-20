import {TaskStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./tasks-reducer";

let startState : TaskStateType = {}

beforeEach(()=> {
    startState = {
        'todolistId1': [
            {id: "1", name: "CSS", isDone: false},
            {id: "2", name: "JS", isDone: true},
            {id: "3", name: "React", isDone: false}
        ],
        'todolistId2': [
            {id: "1", name: "bread", isDone: false},
            {id: "2", name: "milk", isDone: true},
            {id: "3", name: "tea", isDone: false}
        ]
    }
})

test('task should be deleted', () => {

    const endState: TaskStateType = tasksReducer(startState, deleteTaskAC('todolistId2', "2"))

    expect(endState).toEqual({
        'todolistId1': [
            {id: "1", name: "CSS", isDone: false},
            {id: "2", name: "JS", isDone: true},
            {id: "3", name: "React", isDone: false}
        ],
        'todolistId2': [
            {id: "1", name: "bread", isDone: false},
            {id: "3", name: "tea", isDone: false}
        ]
    })
})

test('task should be added', () => {

    const endState: TaskStateType = tasksReducer(startState, addTaskAC( 'todolistId2', "juce"))

    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].name).toBe("juce")
})

test('task status should be changed', () => {

    const endState: TaskStateType = tasksReducer(startState, changeTaskStatusAC('todolistId2', "2", false))

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId2'][0].isDone).toBe(false)

})

test('task title should be changed', () => {

    let newName: string = "JavaScript"

    const endState: TaskStateType = tasksReducer(startState, changeTaskTitleAC( 'todolistId1', "2", newName))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][1].name).toBe(newName)

})


