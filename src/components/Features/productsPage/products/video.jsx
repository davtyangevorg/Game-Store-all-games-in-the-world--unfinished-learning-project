import React, { useState, useContext, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import style from './products.module.scss'

import { FaPlay } from 'react-icons/fa'
import Loader from '../../../../img/svg/videoLoader.svg'

import { IsModalContext } from '../../../../context.js'
import { YouTubeVideoUrlContext } from '../../../../context.js'

const Video = ({ videoUrl, imgName, img, isPlay, youtubeUrl }) => {

    const [isLoad, setIsLoad] = useState(false)


    const { isModal, setIsModal } = useContext(IsModalContext)
    const { setYouTubeName } = useContext(YouTubeVideoUrlContext)
    const videRef = useRef()



    if (videRef.current) {
        if (isPlay && isLoad) {
            videRef.current.play()
        } else {
            videRef.current.pause()
        }
    }

    const fadeVideoBtn = useSpring({
        display: isPlay && isLoad ? 'block' : 'none',
        config: { duration: 50 }
    })
    const fadeImg = useSpring({
        opacity: GetLoadedImage(img) && !isPlay ? 1 : 0,
        config: { duration: 300 }
    })
    const fadeLoaderImg = useSpring({
        opacity: GetLoadedImage(img) ? 0 : 1,
        config: { duration: 300 }
    })
    const fadeVideoLoader = useSpring({
        opacity: isPlay && !isLoad ? 1 : 0,
        config: { duration: 300 }
    })
    const fadeVideo = useSpring({
        opacity: isPlay ? 1 : 0,
        config: { duration: 300 }
    })

    return (
        <div className={style.imgOrVideo}>
            <animated.div onClick={() => { setIsModal(!isModal); setYouTubeName(youtubeUrl) }} style={fadeVideoBtn} >
                <div className={style.videoBtn}>
                    <div className={style.videoBtnIcon}>
                        <FaPlay size='0.5rem' className={style.videoBtnIconPlay} />
                    </div>
                    <div className={style.videoBtnText}>
                        Play full video
                </div>
                </div>
            </animated.div>

            <animated.div style={fadeVideo}>
                <video onLoadedData={() => { setIsLoad(true) }} ref={videRef} className={style.video} muted loop src={videoUrl}></video>
            </animated.div>
            <animated.div style={fadeVideoLoader} className={style.videoLoader} >
                <img alt='name' src={Loader}></img>
            </animated.div>

            <animated.div style={fadeImg}>
                <div className={style.image}>
                    <div className={style.icon}>
                        <FaPlay size='1.2rem' className={style.playBtn} />
                    </div>
                    <img alt={imgName} className={style.photo} src={img} ></img>
                </div>
            </animated.div>
            <animated.div style={fadeLoaderImg}>
                <img src={Loader}></img>
            </animated.div>
        </div>
    )
}
export default Video

const GetLoadedImage = (src) => {
    const [isLoad, setIsLoad] = useState(false)
    if (isLoad) return src
    const img = new Image()
    img.onload = () => setIsLoad(true)
    img.src = src
}