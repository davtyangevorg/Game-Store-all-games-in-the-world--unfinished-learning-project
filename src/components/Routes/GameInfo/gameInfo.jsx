import React,{ Fragment, useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getGamesInfoThunkCreator} from '../../../redux/gamesInfo-reduser.js'
import { useLocation } from 'react-router'
import style from './gameInfo.module.scss'
import {FaXbox,FaWindows,FaTablet,FaAndroid,FaApple,FaLinux,FaPlaystation,FaPlusCircle,FaGift,FaRegFolderOpen,FaRegComment} from 'react-icons/fa'
import targetImage from '../../../img/target.png'
import authRedirect from '../../Features/AuthRedirect.js'

const GameInfo = () => {
    const dispatch = useDispatch()
    const gameInfo = useSelector(state => state.gamesInfo.gameInfo)
    const path=useLocation()
    const gameName=path.pathname.split('/')
    //const [isHandleClickReadMore,setIsHandleClickReadMore]=useState(false)
    //console.log(gameInfo && getReleasDateByOrder(gameInfo.released))
    useEffect(()=>{
        dispatch(getGamesInfoThunkCreator(gameName[gameName.length-1]))
        window.scrollTo(0,0)
    },[])
    const gameInfoInner=gameInfo && 
            <div className={style.gameInfo_header}>
                <div className={style.gameInfo_header_left}>
                    <div className={style.gameInfo_header_left_top}>
                        <div className={style.relaseDate}>
                            {getReleasDateByOrder(gameInfo.released)}
                        </div>
                        <div className={style.platformsName}>
                            {getParentPlatformInons(gameInfo.parent_platforms)}
                        </div>
                        <div className={style.playtime}>
                            AVERAGE PLAYTIME: {gameInfo.playtime} HOURS
                        </div>
                    </div>
                    <div className={style.gameInfo_header_left_title}>
                        {gameInfo.name}
                    </div>
                    <div className={style.add_to_btns}>
                        <button className={style.my_games_btn}><span className={style.top_span}>Add to</span><span className={style.bottom_span}>My games</span><FaPlusCircle size='2.5rem' className={style.add_to_btn_icon}></FaPlusCircle></button>
                        <button className={style.wishList_btn}><span className={style.top_span}>Add to</span><span className={style.bottom_span_wish}>Wishlist <span className={style.bottom_span_wish_span}>{gameInfo.added_by_status && gameInfo.added_by_status.toplay}</span></span><FaGift size='2.5rem' className={style.wishList_btn_icon}></FaGift></button>
                        <button className={style.save_to_btn}><span className={style.top_span}>Save to</span><span className={style.bottom_span_save}>Collection <FaRegFolderOpen size='1.5rem' className={style.save_to_btn_icon}></FaRegFolderOpen></span></button>
                    </div>
                    <div className={style.ratings}>
                        <div className={style.exceptional}>
                            <span className={style.exceptional_span}>Exceptional <img style={{width:'35px',position:'absolute',top:'-6px',right:'-45px'}} src={targetImage}/></span>
                            <div className={style.exceptional_href}>{gameInfo.reviews_count} Ratings</div>
                        </div>
                    </div>
                    <div className={style.write}>
                        <button>Write a review {gameInfo.reviews_count}</button>
                        <button style={{paddingLeft:'55px'}}><FaRegComment className={style.comment_icon} size='1.2rem'/>Write a comment</button>
                    </div>
                    <div className={style.about}>
                        <div className={style.about_title}>About</div>
                        <div className={style.about_text}  dangerouslySetInnerHTML={{__html:gameInfo.description}}></div>
                        <div style={{display:'flex'}}>
                            <div className={style.info_box}>
                                <span  className={style.span_title}>Platforms</span>
                                <div className={style.parent}>{gameInfo.platforms.map((pl,i)=>{
                                    return <Fragment key={pl.platform.id}>
                                            <span className={style.span_text}>{pl.platform.name}</span>
                                            <span className={style.span_comma}>{gameInfo.platforms.length-1===i ? null : ','}</span>
                                        </ Fragment>
                                })}</div>    
                            </div>
                            <div className={style.info_box}>
                                <span className={style.span_title}>Metascore</span>
                                <div className={style.metacritic}>{gameInfo.metacritic}</div>
                            </div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className={style.info_box}>
                                <span  className={style.span_title}>Genre</span>
                                <div className={style.parent}>{gameInfo.genres.map((pl,i)=>{
                                    return <Fragment key={pl.id}>
                                            <span className={style.span_text}>{pl.name}</span>
                                            <span className={style.span_comma}>{gameInfo.genres.length-1===i ? null : ','}</span>
                                        </ Fragment>
                                })}</div>    
                            </div>
                            <div className={style.info_box}>
                                <span className={style.span_title}>Release date</span>
                                <div style={{fontSize:'15px',fontWeight:'300'}} className={style.span_text}>{getReleasDateByOrder(gameInfo.released)}</div>
                            </div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className={style.info_box}>
                                <span  className={style.span_title}>Developer</span>
                                <div className={style.parent}>{gameInfo.developers.map((pl,i)=>{
                                    return <Fragment key={pl.id}>
                                            <span className={style.span_text}>{pl.name}</span>
                                            <span className={style.span_comma}>{gameInfo.developers.length-1===i ? null : ','}</span>
                                        </ Fragment>
                                })}</div>    
                            </div>
                            <div className={style.info_box}>
                                <span  className={style.span_title}>Publisher</span>
                                <div className={style.parent}>{gameInfo.publishers.map((pl,i)=>{
                                    return <Fragment key={pl.id}>
                                            <span className={style.span_text}>{pl.name}</span>
                                            <span className={style.span_comma}>{gameInfo.publishers.length-1===i ? null : ','}</span>
                                        </ Fragment>
                                })}</div>    
                            </div>
                        </div>
                        <div className={style.info_box}>
                                <span className={style.span_title}>Age rating</span>
                                <div style={{fontSize:'15px',fontWeight:'300'}} className={style.span_text}>{gameInfo.esrb_rating && gameInfo.esrb_rating.name}</div>
                        </div>
                        <div  className={style.info_box}>
                                <span  className={style.span_title}>Tags</span>
                                <div style={{width:'100%'}} className={style.parent}>{gameInfo.tags.map((pl,i)=>{
                                    return <Fragment key={pl.id}>
                                            <span className={style.span_text}>{pl.name}</span>
                                            <span className={style.span_comma}>{gameInfo.tags.length-1===i ? null : ','}</span>
                                        </ Fragment>
                                })}</div>    
                        </div>
                        <div className={style.info_box}>
                                <span  className={style.span_title}>Website</span>
                                <div className={style.parent}>
                                    <span className={style.span_text}>{gameInfo.website}</span>    
                                </div>    
                            </div>
                    </div>
                </div>
                <div className={style.gameInfo_header_right}>
                    sdfdafadf
                </div>
            </div>
        
    return (
        <div className={style.gameInfo}>
            {gameInfoInner}
        </div>
    )
}

const getReleasDateByOrder=(date)=>{
    if(date){
    const arr=date.split('-')
    const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December']
    const day=arr[2].length===2&&arr[2][0]==='0' ? arr[2][1] : arr[2]
    const monthNumber=arr[1].length===2&&arr[1][0]==='0' ? arr[1][1] : arr[1]
    const month=monthNames.find((el,index)=>{
        if(monthNumber===(index+1).toString()){
            return el
        }
    })

    return month+' '+day+','+' '+arr[0]
    }
}
const getParentPlatformInons=(platforms)=>{
    //console.log(platforms)
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



const GameInfoContainer=authRedirect(GameInfo)

export default GameInfoContainer

