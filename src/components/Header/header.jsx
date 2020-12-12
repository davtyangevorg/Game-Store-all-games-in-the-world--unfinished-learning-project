import React,{useRef,useState} from 'react'
import style from './header.module.scss'
import logo from './../../img/logo.png'
import { NavLink, Link, useHistory,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as firebase from 'firebase'
import {getSearchGamesThunkCreator,setIsLeftSidbarShowActionCreator} from '../../redux/section-reduser.js'
import {getSearchResultsThunkCreator} from '../../redux/gamesInfo-reduser.js'
import {FaXbox,FaWindows,FaTablet,FaAndroid,FaApple,FaLinux,FaPlaystation} from 'react-icons/fa'
import { useEffect } from 'react'
const Header=()=>{
    const userName=useSelector(state=>state.auth.userName)
    const isAuth=useSelector(state=>state.auth.isAuth)
    const searchResults=useSelector(state=>state.gamesInfo.searchResult)
    const [isShowSearchResults,setIsShowSearchResults]=useState(false)
    const [isFocus,setIsFocus]=useState(false)
    //console.log(searchResults)
    const dispatch = useDispatch()
    const inputCurent=useRef()
    const history = useHistory();
    //isPathLoginOrWelcomePage(history.location.pathname)
    const [isShowBurger,setIsShowBurger]=useState(false)
    useEffect(() => {
        window.addEventListener('resize',()=>{
            if(window.innerWidth<=1024) return setIsShowBurger(true)
            return setIsShowBurger(false)
        })   
        if(window.innerWidth<=1024) return setIsShowBurger(true)
    })
    useEffect(() => {
        if(searchResults.length>0){
            setIsShowSearchResults(true)
        }
        if (searchResults.length===0) {
            setIsShowSearchResults(false)
        }
        if(!inputCurent.current.value){
                    setIsShowSearchResults(false)
        }
    },[searchResults])
    const element=useRef()
    ClickNotThisElement(element,setIsShowSearchResults)
    const handleChange=()=>{
        
        dispatch(getSearchResultsThunkCreator(inputCurent.current.value))
    }
    const onKeyDown=(event)=>{
        if (event.key === 'Enter'&& inputCurent.current.value) {
           dispatch(getSearchGamesThunkCreator(inputCurent.current.value))
           history.push(`/home/search/${inputCurent.current.value}`)
           inputCurent.current.value=null
        }
    }
    const logOut=()=>{
        firebase.auth().signOut()
    }
    const findedGames=searchResults.map((el,index)=>{
        if(index<=5&&el.parent_platforms){
            return  <div className={style.game} key={el.id}>
                        <div style={{width:'40px',height:'50px'}}><img style={{width:'100%',height:'50px',objectFit:'cover',borderRadius:'5px'}} alt='n' src={el.background_image}></img></div>
                        <div className={style.game_text}>
                            <div style={{display:'flex',marginBottom:'5px'}}>{getParentPlatformInons(el.parent_platforms)}</div>
                            <div><Link onClick={()=>{setIsShowSearchResults(false);inputCurent.current.value='';setIsFocus(false)}} className={style.game_text_link} to={`/home/games/${el.slug}`}>{el.name}</Link></div>
                        </div>
                    </div>
        }
    })
    //  console.log(isFocus)
    const match=useLocation()
    const path=match.pathname
    return(
        <div className={style.header}>
            <NavLink className={style.logo} to={path.split('').length===1 ? `/` : `/home`}><img style={{cursor:'pointer'}} alt='img' src={logo}></img></NavLink>
            <div    onBlur={()=>{setIsFocus(false)}} 
                    onFocus={()=>{setIsFocus(true)}} ref={element}  
                    className={`${style.inputDiv} ${isFocus ? style.isFocus : null}`}>
                <div className={style.icon}><i className="fa fa-search"></i></div>
                <input className={style.input} onKeyDown={(e)=>{onKeyDown(e)}} onChange={()=>{handleChange()}} ref={inputCurent} role="searchbox" placeholder=' Search games'></input>
                {isShowSearchResults ? <div className={style.searchResults}>
                    <div className={style.searchResults_inner}>
                        {findedGames}
                    </div>
                </div> : null}
            </div>
            {isShowBurger && !isPathLoginOrWelcomePage(history.location.pathname) ? 
                <div onClick={()=>{dispatch(setIsLeftSidbarShowActionCreator(true))}} className={`${style.burger} `}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div> : 
                <div className={style.login}>
                    {isAuth ? <div className={style.link}>{userName}</div> : <Link to='/login' className={style.link}><div>LOG IN</div></Link>}    
                    {isAuth ? <div onClick={logOut} className={style.logOutBtn}>Log Out</div> : 
                                                                    <Link to='/signup' className={style.link}><div>SIGN UP</div></Link>}    
                </div>
            }
        </div>
    )   
}

export default Header


const getParentPlatformInons=(platforms)=>{
    
    const iconSize='1em'
    return  platforms.map((pl)=>{
        if(pl.platform.name==='PC'){
            pl.platform.name=<FaWindows size={iconSize}/>
        }
        else if(pl.platform.name==='iOS'){
            pl.platform.name=<FaTablet size={iconSize}/>
        }
        else if(pl.platform.name==='Android'){
            pl.platform.name=<FaAndroid size={iconSize}/>
        }
        else if(pl.platform.name==='Apple Macintosh'){
            pl.platform.name=<FaApple size={iconSize}/>
        }
        else if(pl.platform.name==='Linux'){
            pl.platform.name=<FaLinux size={iconSize}/>
        }
        else if(pl.platform.name==='Xbox'){
            pl.platform.name=<FaXbox size={iconSize}/>
        }
        else if(pl.platform.name==='PlayStation'){
            pl.platform.name=< FaPlaystation size={iconSize}/>
        }   
        
        return(<div style={{marginRight:'10px'}}  key={pl.platform.id}>{pl.platform.name}</div>)
    })
    
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

const isPathLoginOrWelcomePage=(path)=>{
    const arr1=path.split('/')
    let isTrue=false
    arr1.find((el)=>{
        if(el==='login'||el==='signup'){
            isTrue=true
        }
    })
    const arr2=path.split('/')
    if(arr2[0]===''&&arr2[1]==='') {isTrue=true}
    return isTrue
}