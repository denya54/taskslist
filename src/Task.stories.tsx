import {Task} from "./Task";
import {v1} from "uuid";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Task',
    component: Task
}

let changeStatusCallback = action('clicked: Change Status')
let deleteTaskCallback = action('clicked: Delete Task')
let changeTaskTitleCallback = action('clicked: Change Task Title')

export const TaskIsDoneExample = () => {
    return <Task todolistID={'1'}
                 task={  {id: '1', name: ' React', isDone: true}}
                 changeStatus={changeStatusCallback}
                 deleteTask={deleteTaskCallback}
                 changeTaskTitle={changeTaskTitleCallback}/>
}

export const TaskIsNotDoneExample = () => {
    return <Task todolistID={'1'}
                 task={  {id: '1', name: ' React', isDone: false}}
                 changeStatus={changeStatusCallback}
                 deleteTask={deleteTaskCallback}
                 changeTaskTitle={changeTaskTitleCallback}/>
}