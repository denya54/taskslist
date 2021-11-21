import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemFormPropsType = {
    func: (newTitle: string ) => void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {

    let [inputValue, setInputValue] = useState('')
    let [error, setError] = useState(false)

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }

    const addTextWithClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== false) {
            setError(false)
        }

        if (e.code === "Enter") {
            props.func(inputValue)
            setInputValue('')
        }
    }

    const addTextInState = () => {
        if (inputValue.trim() !== '') {
            props.func(inputValue)
            setInputValue('')
        }
        else {
            setError(true)
        }
    }

    return (
        <div>
            <input value={inputValue} onChange={changeInputValue} onKeyPress={addTextWithClickEnter}
                   className={error ? 'error' : ''}/>
            <button onClick={addTextInState}>+</button>
            {error && <div className={'error-message'}>Title is required</div>}
        </div>
    )
})