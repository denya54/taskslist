import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import React from "react";


export default {
    title: 'Task',
    component: Task
}
const deleteTaskCallback = action('Click: deleteTask')
const changeStatusCallback = action('Click: changeStatus')
const changeTaskTitleCallback = action('Click: changeTaskTitle')

export const TaskBasedExample = () => {
    return <>
    <Task
          todolistID={'todolistID1'}
          task={{id: '1', name: 'React', isDone: true}}
          deleteTask={deleteTaskCallback}
          changeStatus={changeStatusCallback}
          changeTaskTitle={changeTaskTitleCallback}/>
        <Task
            todolistID={'todolistID2'}
            task={{id: '1', name: 'Redux', isDone: false}}
            deleteTask={deleteTaskCallback}
            changeStatus={changeStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}/>


    </>
}


