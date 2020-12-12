import React from 'react'
import {useState,useEffect,useRef} from 'react'
import style from './selectBox.module.scss'
import {FaChevronDown} from 'react-icons/fa'



const SelectBox = (props) => {
    const {getResponseElements}=props
    const [items] = useState(props.items)
    const [isShow,setIsShow]=useState(false)
    const [selected,setSelected] = useState(props.items[0].text)
    const [value,setValue]=useState(props.items[0].value)
    //const [platformShow,setPlatformShow]=useState(false)
    useEffect(() => {
        getResponseElements(value)
    },[selected])

    const wrapperRef = useRef(null);
    ClickNotThisElement(wrapperRef,setIsShow)
    

    const changeIsShow=()=>{    
        setIsShow(!isShow)
    }
    const changeSelected=(id)=>{
         setSelected(props.items[id].text)
         setValue(props.items[id].value)
         setIsShow(false)
    }
    // const fadePlatform=useSpring({
    //     opacity:platformShow ? 1 : 0,
    //     config:{duration:100}
    // })
    return (
        <div ref={wrapperRef} className={style.box}>
            <div  onClick={changeIsShow} className={style.boxTitle}>
                <div className={style.textHover}>{props.textValue} {selected}</div>
                <div className={`${(isShow) ? style.arrowDown : ''} ${style.arrow}`}>
                    <FaChevronDown />
                </div>
            </div>
            <div  className={`${(isShow) ? style.optionsShow : style.optionsHide} ${style.option}`}>
                {items.map((el)=>{
                    //console.log(el.platforms)
                    return(
                        <div   className={style.optionElement} onClick={()=>{changeSelected(el.id)}} key={el.id}>
                            {el.text}
                            {/* {el.platforms&&el.platforms.length>1 && <div className={style.optionElement_chevron}><FaChevronRight /></div>} */}
                            {/* {el.platforms ? <animated.div  className={style.optionInnerOption}>
                                {el.platforms.map((pl)=>{
                                    return(
                                        <div key={pl.id}>
                                            {pl.text}
                                        </div>
                                    )
                                }) }
                            </animated.div> : null} */}
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function ClickNotThisElement(ref,set){
    useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            set(false)
          }
        }
        document.addEventListener("click", handleClickOutside);
    }, [ref]);
}

export default SelectBox
