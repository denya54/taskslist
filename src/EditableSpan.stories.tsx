import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'EditableSpan',
    component: EditableSpan
}

let callback = action('clicked: want to change')

export const EditableSpanBasedExample = () => {
    return <EditableSpan taskName={'JavaScript'} func={callback}/>
}