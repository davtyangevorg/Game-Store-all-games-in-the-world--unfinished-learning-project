import React from 'react'
import { useState, useEffect, useRef } from 'react'
import style from './selectBox.module.scss'
import { FaChevronDown } from 'react-icons/fa'



const SelectBox = ({ getResponseElements, textValue, items }) => {
    const [isShow, setIsShow] = useState(false)
    const [selected, setSelected] = useState(items[0].text)
    const [value, setValue] = useState(items[0].value)
    useEffect(() => {
        getResponseElements(value)
    }, [value])

    const wrapperRef = useRef(null);
    ClickNotThisElement(wrapperRef, setIsShow)


    const changeIsShow = () => setIsShow(!isShow)
    const changeSelected = (id) => {
        setSelected(items[id].text)
        setValue(items[id].value)
        setIsShow(false)
    }
    return (
        <div ref={wrapperRef} className={style.box}>
            <div onClick={changeIsShow} className={style.boxTitle}>
                <div className={style.textHover}>{textValue} {selected}</div>
                <div className={`${(isShow) ? style.arrowDown : ''} ${style.arrow}`}>
                    <FaChevronDown />
                </div>
            </div>
            <div className={`${(isShow) ? style.optionsShow : style.optionsHide} ${style.option}`}>
                {items.map((el) => {
                    return (
                        <div className={style.optionElement} onClick={() => { changeSelected(el.id) }} key={el.id}>
                            {el.text}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function ClickNotThisElement(ref, set) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                set(false)
            }
        }
        document.addEventListener("click", handleClickOutside);
    }, [ref, set]);
}

export default SelectBox
