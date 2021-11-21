import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemFormComponent',
    component: AddItemForm
}

const callback = action('Button was clicked')

export const AddItemFormBasedExamole = (props: any) => {
    return <AddItemForm func={callback}/>
}