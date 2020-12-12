import React,{useContext,useEffect,useRef,useState,useLayoutEffect, Fragment} from 'react'
import style from './leftSidbar.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {FaStar,FaGripfire,FaCalendarAlt,FaFastForward,FaCrown,FaChartBar,FaTrophy,FaGamepad,FaDownload,FaGhost,FaUserAlt,FaTags,FaCode,FaCity,FaSignInAlt,FaUserPlus} from 'react-icons/fa'
import {NavLink,Link} from 'react-router-dom' 
import {setIsLeftSidbarShowActionCreator} from '../../redux/section-reduser.js'
import {ThisMonthContext} from './../../context.js'
import * as firebase from 'firebase'

const LeftSidbar=(props)=>{
    const ref = useRef()
    const context = useContext(ThisMonthContext)
    const [isChangePos,setIsChangePos]=useState(true)
    const [isChangePosTop,setIsChangePosTop]=useState(false)
    const [isChangeSti,setIsChangeSti]=useState(false)
    let [leftSidbarStyle,setLeftSidbarStyle]=useState(null)
    const isLeftSidbarShow = useSelector(state => state.section.isLeftSidbarShow)
    const isAuth = useSelector(state => state.auth.isAuth)
    console.log(isAuth)
    const dispatch = useDispatch()
    
    //const [isModal,setIsModal]=useState(false)
    //console.log(isLeftSidbarShow)
    //console.log(isModal)
    // useEffect(() => {
    //   window.addEventListener('resize',()=>{
    //     if(window.innerWidth<=1024) return setIsModal(true)
    //   })
    // },[])
    //console.log(isModal)
    useEffect(()=>{
        if(isLeftSidbarShow){
           document.body.style.overflow='hidden'
        }else{
          document.body.style.overflow='visible'
        } 
        
    },[isLeftSidbarShow])
    //-------------------------------------------------------------------------------------------------------------------------
    useScrollPosition(
        ({ prevPos, currPos }) => {
          if(-currPos.y>100&&-currPos.y<300&&!isChangePosTop){
            setLeftSidbarStyle({position:'relative',top:'0px'})
            setIsChangeSti(false)
          }
          if(-currPos.y>300&&prevPos.y>currPos.y&&!isChangeSti){
            setLeftSidbarStyle({position:'sticky',top:'-300px'})
          }
          if(-currPos.y>300&&prevPos.y>currPos.y&&isChangeSti){
            if(ref.current.getBoundingClientRect().top===0){
              setLeftSidbarStyle({position:'relative',top:`${-currPos.y-150}px`})
            }
            if(ref.current.getBoundingClientRect().top<=-300){
              setLeftSidbarStyle({position:'sticky',top:`-300px`})
            }
          }
          if(prevPos.y<currPos.y){
            if(-currPos.y>300){
              setIsChangeSti(true)
            }
            if(-currPos.y>=600&&isChangePos){
              setIsChangePos(false)
              setIsChangePosTop(true)
              setLeftSidbarStyle({position:'relative',top:`${-currPos.y-450}px`})
            }
          }
          if(prevPos.y>currPos.y){
            setIsChangePos(true)
            setIsChangePosTop(false)
          }
          if(!isChangePos&&ref.current.getBoundingClientRect().top>=0){
            setLeftSidbarStyle({position:'sticky',top:`0px`})
          }
        })
    //-------------------------------------------------------------------------------------------------------------------------
    let month=props.month
    if(!month){
        month=context
    }
    const isDisblay=isLeftSidbarShow ? {
      transform: 'translateY(0)'
    } : null

    const loginLogoutInLefetSidbar=
      <div style={{position:'absolute',top:'27px',right:'20px',alignItems:'center'}}>
          <div onClick={()=>{dispatch(setIsLeftSidbarShowActionCreator(false))}} style={{marginLeft:'6px',cursor:'pointer',fontSize:'35px',fontWeight:'300',marginBottom:'15px'}}>&#10006;</div>
          {isAuth ? <div onClick={()=>{firebase.auth().signOut();dispatch(setIsLeftSidbarShowActionCreator(false))}} style={{cursor:'pointer'}}><div><FaSignInAlt style={{padding:'10px',backgroundColor:'black',color:'white',width:'45px',height:'45px',borderRadius:'50%'}}/></div>
            <div style={{marginBottom:'15px',fontSize:'12px',color:'#C1C1C1',fontWeight:'300'}}>Log Out</div></div> :
          <div>
          <Link onClick={()=>{dispatch(setIsLeftSidbarShowActionCreator(false))}} to='/login' style={{textAlign:'center',cursor:'pointer',textDecoration:'none'}}>
            <div><FaSignInAlt style={{padding:'10px',backgroundColor:'black',color:'white',width:'45px',height:'45px',borderRadius:'50%'}}/></div>
            <div style={{marginBottom:'15px',fontSize:'12px',color:'#C1C1C1',fontWeight:'300'}}>Log In</div>
          </Link>
          <Link onClick={()=>{dispatch(setIsLeftSidbarShowActionCreator(false))}} to='/signup' style={{textAlign:'center',cursor:'pointer',textDecoration:'none'}}>
            <div><FaUserPlus style={{padding:'10px',backgroundColor:'black',color:'white',width:'45px',height:'45px',borderRadius:'50%'}}/></div>
            <div style={{marginBottom:'15px',fontSize:'12px',color:'#C1C1C1',fontWeight:'300'}}>Sign Up</div>
          </Link>
          </div>}
      </div>

    return(
      <Fragment  >
        {isLeftSidbarShow && <div onClick={()=>{dispatch(setIsLeftSidbarShowActionCreator(false))}} className={style.leftSidbar_top} ></div>}
        {<div  style={leftSidbarStyle,isDisblay} ref={ref} className={`${style.leftSidbar} `}>
            {isLeftSidbarShow && loginLogoutInLefetSidbar}
            <div><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} exact activeClassName={style.activeParent} className={style.navLink} to='/home'>Home</NavLink></div>
            <ul>New Releases
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/last-30-days'><FaStar  className={style.starIcon}/><div>Last 30 days</div></NavLink></li>
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/this-week'><FaGripfire className={style.starIcon}/><div>This week</div></NavLink></li>
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/next-week'><FaFastForward className={style.starIcon}/><div>Next week</div></NavLink></li>
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to={`/home/release-calendar/${month}`}><FaCalendarAlt className={style.starIcon}/><div>Release calendar</div></NavLink></li>
            </ul>
            <ul>Top
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/best-of-the-year'><FaTrophy  className={style.starIcon}/><div>Best of the year</div></NavLink></li>   
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/popular-last-year'><FaChartBar className={style.starIcon}/><div>Popular in Last Year</div></NavLink></li>
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/all-time-top-250'><FaCrown className={style.starIcon}/><div>All time top 250</div></NavLink></li>
            </ul>
            <ul>Browse
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/platforms'><FaGamepad  className={style.starIcon}/><div>Platforms</div></NavLink></li>   
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/stores'><FaDownload className={style.starIcon}/><div>Stores</div></NavLink></li>
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/genres'><FaGhost className={style.starIcon}/><div>Genres</div></NavLink></li>
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/creators'><FaUserAlt className={style.starIcon}/><div>Creators</div></NavLink></li>
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/tags'><FaTags className={style.starIcon}/><div>Tags</div></NavLink></li>
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/developers'><FaCode className={style.starIcon}/><div>Developers</div></NavLink></li>
                <li><NavLink onClick={()=>{isLeftSidbarShow && dispatch(setIsLeftSidbarShowActionCreator(false))}} activeClassName={style.activeChild} className={style.liNavLink} to='/home/publishers'><FaCity className={style.starIcon}/><div>Publishers</div></NavLink></li>
            </ul>
        </div>}
      </Fragment>
    )
}


const isBrowser = typeof window !== `undefined`

function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

export function useScrollPosition(effect, deps, element, useWindow, wait) {
  const position = useRef(getScrollPosition({ useWindow }))

  let throttleTimeout = null

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow })
    effect({ prevPos: position.current, currPos })
    position.current = currPos
    throttleTimeout = null
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)
}

export default LeftSidbar