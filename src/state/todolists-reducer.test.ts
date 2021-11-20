import {v1} from "uuid";
import {FilterType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistID1: string
let todolistID2: string
let startState: Array<TodolistType>

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    startState = [
        {id: todolistID1, name: 'What to learn', filter: 'all'},
        {id: todolistID2, name: 'What to buy', filter: 'all'},
    ]
})

test('todolist should be deleted', () => {

    const endState = todolistsReducer(startState, deleteTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('todolist should be added', () => {

    let titleForNewTodolist = 'New'

    const endState: Array<TodolistType> = todolistsReducer(startState, addTodolistAC(titleForNewTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].name).toBe(titleForNewTodolist)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistID2, newTodolistTitle));

    expect(endState[0].name).toBe("What to learn");
    expect(endState[1].name).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterType = "completed";

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



