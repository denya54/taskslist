import {v1} from "uuid";
import {FilterType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from "./todolists-reducer";


test('todolist should be deleted', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState : Array<TodolistType> = [
        {id: todolistID1, name: '1', filter: 'all'},
        {id: todolistID2, name: '2', filter: 'all'},
    ]

    const endState: Array<TodolistType> = todolistsReducer(startState,deleteTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('todolist should be added', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let titleForNewTodolist = 'New'

    const startState : Array<TodolistType> = [
        {id: todolistID1, name: '1', filter: 'all'},
        {id: todolistID2, name: '2', filter: 'all'},
    ]

    const endState: Array<TodolistType> = todolistsReducer(startState, addTodolistAC(titleForNewTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].name).toBe(titleForNewTodolist)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, name: "What to learn", filter: "all"},
        {id: todolistId2, name: "What to buy", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        todolistID: todolistId2,
        name: newTodolistTitle
    };

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].name).toBe("What to learn");
    expect(endState[1].name).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, name: "What to learn", filter: "all"},
        {id: todolistId2, name: "What to buy", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        todolistID: todolistId2,
        filter: newFilter
    };

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2,newFilter ));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



