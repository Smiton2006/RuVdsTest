import React, { useState } from 'react';


class Props {    
    /** 
     * Удален сервер?
     * @type {boolean}
     */
    remove;

    /**
    * Отключен чекбокс
    * @type {boolean}
    */
    disable;

    /**
    * Действие при выборе чекбокса
    * @type {()=> void}
    */
    onSelect;

    /**
    * Действие при отмене выбора чекбокса
    * @type {()=> void}
    */
    onUnselect;
}


/** Чекбокс удаелния сервера
 * @param {Props} props
 * */
export default function SelectedForRemoveCheckbox({ remove, disable, onSelect, onUnselect }) {
    const [checked, setChecked] = useState(remove)

    const onChange = () => {
        if (!checked) {
            onSelect()
        }
        else {
            onUnselect()
        }
        setChecked(!checked)
    }

    return <input type='checkbox' checked={checked} disabled={disable} onChange={onChange} />
}