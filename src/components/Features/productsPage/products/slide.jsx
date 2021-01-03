import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import style from './products.module.scss'


const ImageSlide = ({ imgName, img, images, isPlay }) => {

    const [photo, setPhoto] = useState(img)

    const fadeSlider = useSpring({
        opacity: isPlay ? 1 : 0,
        config: { duration: 300 }
    })
    const fadeImg = useSpring({
        opacity: isPlay ? 0 : 1,
        config: { duration: 300 }
    })

    const slide = images.map((el) => {
        return <div key={el.id} onMouseEnter={() => { getImage(el.id) }} className={style.slideBtnParent}>
            <div className={style.slideBtn}></div>
        </div>
    })
    const getImage = (id) => {
        images.filter((el) => {
            if (el.id === id) setPhoto(el.image)
            return null
        })
    }
    return (
        <div className={style.imageOrSlide}>
            <animated.div style={fadeImg}>
                {<img alt={imgName} className={style.image} src={img}></img>}
            </animated.div>
            <animated.div style={fadeSlider} className={style.slide}>
                <img alt='name' src={photo}></img>
            </animated.div>
            <animated.div style={fadeSlider} className={style.slideBtns}>
                {slide}
            </animated.div>
        </div>
    )
}

export default ImageSlide
