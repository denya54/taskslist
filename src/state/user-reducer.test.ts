import {StateType, userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState: StateType = {
        age: 20,
        childrenCount: 2,
        name: 'Dimon'
    }

    const endState: StateType = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only children count', () => {
    const startState: StateType = {
        age: 20,
        childrenCount: 2,
        name: 'Dimon'
    }

    const endState: StateType = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
})

test('user name should be changed', () => {
    const startState: StateType = {
        age: 20,
        childrenCount: 2,
        name: 'Dimon'
    }

    const newName = 'Vasya'

    const endState: StateType = userReducer(startState, {type: 'CHANGE-USER-NAME', newName: newName})

    expect(endState.name).toBe(newName)

})