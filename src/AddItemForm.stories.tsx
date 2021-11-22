import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm',
    component: AddItemForm
}

const callback = action('button was click ')

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm func={callback}/>
}