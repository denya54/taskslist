import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";


export default {
    title: 'EditableSpan',
    component: EditableSpan
}

let callback = action('click: changeName')

export const EditableSpanBasedExample = () => {
    return <EditableSpan taskName={'JavaScript'} func={callback}/>

}