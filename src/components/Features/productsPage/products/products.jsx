import React from 'react'
import style from './products.module.scss'

import { FaXbox, FaWindows, FaTablet, FaAndroid, FaApple, FaLinux, FaPlaystation } from 'react-icons/fa'
import { GrAdd } from 'react-icons/gr'

import { Link } from 'react-router-dom'

import ImageSlide from './slide.jsx'
import Video from './video.jsx'

const Products = ({ play, notPlay, products }) => {

    const productsPage = products.map((el) => {

        if (el.parent_platforms) {
            var platformIcon = getPlatformIcon(el.parent_platforms)
        }
        return (
            <div onMouseEnter={() => { play(el.id) }}
                onMouseLeave={() => { notPlay(el.id) }}
                className={style.product} key={el.id}
            >
                {el.clip ?
                    <Video videoUrl={el.clip.clips.full}
                        imgName={el.name}
                        img={el.background_image}
                        isPlay={el.isPlay}
                        youtubeUrl={el.clip.video}
                    />
                    : <ImageSlide imgName={el.name} img={el.background_image} images={el.short_screenshots} isPlay={el.isPlay} />
                }
                <div className={style.tools}>
                    <div className={style.toolsTop}>
                        <div className={style.platformsAndMeta}>
                            <div className={style.platforms}>{platformIcon}</div>
                            <div className={el.metacritic === null ? null : style.metacritic}>{el.metacritic}</div>
                        </div>
                        <div className={style.name}><Link to={`/home/games/${el.slug}`} className={style.link}>{el.name}</Link></div>
                        <div className={style.btn_add}>
                            <GrAdd />
                            <div>{addCommaOrNot(el.added)}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className={style.products}>
            {productsPage}
        </div>
    )
}

export default Products

const addCommaOrNot = (number) => {
    if (number.toString().length < 4) return number
    const newArr = []
    let q = 1
    number.toString().split('').reverse().forEach(el => {
        if (q % 3 === 0) {
            newArr.push(el)
            newArr.push(',')
            q++
        } else {
            newArr.push(el)
            q++
        }
    });
    return newArr.reverse().join('')
}

const getPlatformIcon = (parentPlatforms) => {
    const iconSize = '0.8em'
    return parentPlatforms.map((pl) => {
        if (pl.platform.name === 'PC') {
            pl.platform.name = <FaWindows size={iconSize} />
        }
        else if (pl.platform.name === 'iOS') {
            pl.platform.name = <FaTablet size={iconSize} />
        }
        else if (pl.platform.name === 'Android') {
            pl.platform.name = <FaAndroid size={iconSize} />
        }
        else if (pl.platform.name === 'Apple Macintosh') {
            pl.platform.name = <FaApple size={iconSize} />
        }
        else if (pl.platform.name === 'Linux') {
            pl.platform.name = <FaLinux size={iconSize} />
        }
        else if (pl.platform.name === 'Xbox') {
            pl.platform.name = <FaXbox size={iconSize} />
        }
        else if (pl.platform.name === 'PlayStation') {
            pl.platform.name = < FaPlaystation size={iconSize} />
        }
        return (<div key={pl.platform.id}>{pl.platform.name}</div>)
    })
}
