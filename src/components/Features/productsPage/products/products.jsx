import React,{useState,useContext,useRef} from 'react'
import style from './products.module.scss'

import {FaXbox,FaWindows,FaTablet,FaAndroid,FaApple,FaLinux,FaPlaystation,FaPlay} from 'react-icons/fa'
import {GrAdd} from 'react-icons/gr'
import {useSpring,animated} from 'react-spring'

import {IsModalContext} from '../../../../context.js'
import {YouTubeVideoUrlContext} from '../../../../context.js'

import videoLoader from '../../../../img/svg/videoLoader.svg'
import { Link } from 'react-router-dom'

const Products = (props) => {
    const [isLoadV,setIsLoadV]=useState(false)
    const GetImg=(src)=>{
        const [isLoad,setIsLoad]=useState(false)
        const img=new Image()
        img.src=src
        img.onload=()=>{
            setIsLoad(true)
        }
        if(isLoad){
            return src
        }
    }
    
    const iconSize='0.8em'
    const productsPage=props.products.map((el)=>{
        if(el.parent_platforms){
            
            var platformIcon=el.parent_platforms.map((pl)=>{
                
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
                
                return(<div  key={pl.platform.id}>{pl.platform.name}</div>)
            })
        }    
        let orginalImg=GetImg(el.background_image)
        let imageSrc= orginalImg ? orginalImg : videoLoader
        
        return(
            <div onMouseEnter={()=>{ props.change(el.id)}} 
                 onMouseLeave={()=>{ props.changeFalse(el.id)}} 
                 className={style.product} key={el.id}
            >
                    {el.clip ? ( <Video url={el.clip.clips.full} imgName={el.name} img={imageSrc} isPlay={el.isPlay} youtubeUrl={el.clip.video} isLoad={isLoadV} setIsLoad={setIsLoadV}  />) : 
                                <ImageSlide imgName={el.name} img={imageSrc} images={el.short_screenshots} isPlay={el.isPlay} /> }
                <div  className={style.tools}>
                    <div className={style.toolsTop}>
                        <div className={style.platformsAndMeta}>
                            <div className={style.platforms}>{platformIcon}</div>
                            <div className={el.metacritic===null ? null : style.metacritic}>{el.metacritic}</div>
                        </div>
                        <div  className={style.name}><Link to={`/home/games/${el.slug}`} className={style.link}>{el.name}</Link></div>
                        <div className={style.btn_add}>
                            <GrAdd   />
                            <div>{addCommaOrNot(el.added)}</div>
                        </div>
                    </div>
                    {/* <div className={style.toolsBottom}>
                        <div className={style.toolsBottomInner}>
                            <div className={style.info}>
                                <div className={style.infoText}>Release date:</div>
                                <div className={style.infoValue}>{el.released}</div>
                            </div>
                            <div className={style.info}>
                                <div className={style.infoText}>Genres:</div>
                                <div className={style.infoValue&&style.gener}>{el.genres.map(gen=><div key={gen.id}>{gen.name}<span>,</span></div>)} </div>
                            </div>
                            <div className={style.info}>
                                <div className={style.infoText}>Chart:</div>
                                <div className={style.infoValue}>wefewf</div>
                            </div>
                            <div className={style.showMoreBtn}>
                                <button>Show more like this</button>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    })
    return (
        <div  className={style.products}>
            {productsPage}
            
        </div>
    )
}

export default Products

const Video=({url,imgName,img,isPlay,youtubeUrl,isLoad,setIsLoad})=>{
    const {isModal,setIsModal} = useContext(IsModalContext)
    const {youtubeName,setYouTubeName} = useContext(YouTubeVideoUrlContext)
    const videRef=useRef()
    const videoUrl=url



    if(videRef.current){
        if(isPlay){
            videRef.current.play()
        }else{
            videRef.current.pause()
        }
    }

    // const fadePlayer=useSpring({
    //     opacity:isPlay ? 1 : 0,
    //     config:{duration:300}
    // })
    const fadeVideoBtn=useSpring({
        opacity:isLoad&&isPlay ? 1 : 0,
        config:{duration:50}
    })
    const fadeImg=useSpring({
        opacity:isLoad&&isPlay ? 0 : 1,
        config:{duration:300}
    })
            const fadeLoader=useSpring({
                opacity:isLoad ? 0 : 1,
                config:{duration:300}
            })
            const fadeVideo=useSpring({
                opacity:isLoad&&isPlay ? 1 : 0,
                config:{duration:300}
            })
    return(
        <div  className={style.imgOrVideo}>
            
            <animated.div onClick={()=>{setIsModal(!isModal);setYouTubeName(youtubeUrl)}} style={fadeVideoBtn} className={style.videoBtn}>
                <div className={style.videoBtnIcon}>
                    <FaPlay size='0.5rem' className={style.videoBtnIconPlay}/>
                </div>
                <div className={style.videoBtnText}>
                    Play full video
                </div>
            </animated.div> 
            <animated.div style={fadeVideo}>
            
                    <video onLoadedData={()=>{setIsLoad(true)}}  ref={videRef} className={style.video} muted loop  src={videoUrl}></video>
            </animated.div>
            <animated.div style={fadeImg}>
                <div className={style.image}>
                    <div className={style.icon}>
                        <FaPlay size='1.2rem' className={style.playBtn}/>
                    </div>
                    <img  alt={imgName} className={style.photo} src={img} ></img>
                    <animated.div style={fadeLoader} className={style.videoLoader} >
                        <img alt='name' src={videoLoader}></img>
                    </animated.div>
                </div>
            </animated.div>
            {/* <animated.div >
                <img src={preloader}></img>
            </animated.div> */}
        </div>
    )
}   
const ImageSlide=({imgName,img,images,isPlay})=>{
    const [photo,setPhoto]=useState(img)
    const fadeSlider=useSpring({
        opacity:isPlay ? 1 : 0,
        config:{duration:300}
    })
    const fadeImg=useSpring({
        opacity:isPlay ? 0 : 1,
        config:{duration:300}
    })
    const slide=images.map((el)=>{
        return  <div key={el.id} onMouseEnter={()=>{getImage(el.id)}}  className={style.slideBtnParent}>
                    <div  className={style.slideBtn}></div>
                </div>
    })
    
    const getImage=(id)=>{
        images.filter((el)=>{
                if(el.id===id){
                    setPhoto(el.image)
                }
        })        
    }
    return(
        <div className={style.imageOrSlide}>
            <animated.div style={fadeImg}><img  alt={imgName} className={style.image} src={img}></img></animated.div>
            <animated.div style={fadeSlider} className={style.slide}>
                <img alt='name' src={photo}></img>
            </animated.div>
            <animated.div style={fadeSlider} className={style.slideBtns}>
                {slide}
            </animated.div>
        </div>
    )
}

const addCommaOrNot=(number)=>{

    let strNumber=number.toString()
    if(strNumber.length<4){
        return strNumber
    }
    else{
        let a=strNumber.split('')
        let b=1
        if(a.length===5){
            b=2
        }
        else if(a.length===6){
            b=3
        }
        let newN=a.splice(0,b)
        newN.push(',',a.join(''))
        let result=newN.join('')
  
        return result
    }   
}
  