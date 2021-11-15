import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    taskName: string
    func: (newName: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [valueInput, setValueInput] = useState('')

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
    }

    const OnEditMode = () => {
        setEditMode(true)
        setValueInput(props.taskName)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.func(valueInput)
    }

    return (
        editMode ? <input value={valueInput} onChange={changeInputValue} onBlur={offEditMode} autoFocus/>
            : <span onDoubleClick={OnEditMode}>{props.taskName}</span>

    )
}