import React from 'react'
import style from './sectionPage.module.scss'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Loader from '../../../img/svg/loader.svg'

import SelectBox from '../select-box/select-box.jsx'
import ProductsPage from '../productsPage/productsPageContainer.jsx'


const SectionPage = ({ title, text, date, count, isLoad, prevHttp, nextHttp, products, getProducts, getAgainProducts, isTrue, isOrder }) => {
    const [order, setOrder] = useState('-added')
    const [platform, setPlatform] = useState(0)

    useEffect(() => {
        getProducts(order, platform, date)
    }, [order, platform, date,getProducts])

    const getOrderResponseElements = (value) => {
        if (value === '-added' && order === '-added') return
        setOrder(value)
        getProducts(value, platform, date)
    }
    const getPlatformResponseElements = (value) => {
        if (value === 0 && platform === 0) return
        setPlatform(value)
        getProducts(order, value, date)
    }

    return (
        <div >
            <div className={style.title}>
                {title}
            </div>
            {isTrue ? <div className={style.monthes}>
                <NavLink to={`/release-calendar/01`} activeClassName={style.active} className={style.link}><div>Jan</div></NavLink>
                <NavLink to={`/release-calendar/02`} activeClassName={style.active} className={style.link}><div>Feb</div></NavLink>
                <NavLink to={`/release-calendar/03`} activeClassName={style.active} className={style.link}><div>Mar</div></NavLink>
                <NavLink to={`/release-calendar/04`} activeClassName={style.active} className={style.link}><div>Apr</div></NavLink>
                <NavLink to={`/release-calendar/05`} activeClassName={style.active} className={style.link}><div>May</div></NavLink>
                <NavLink to={`/release-calendar/06`} activeClassName={style.active} className={style.link}><div>Jun</div></NavLink>
                <NavLink to={`/release-calendar/07`} activeClassName={style.active} className={style.link}><div>Jul</div></NavLink>
                <NavLink to={`/release-calendar/08`} activeClassName={style.active} className={style.link}><div>Aug</div></NavLink>
                <NavLink to={`/release-calendar/09`} activeClassName={style.active} className={style.link}><div>Sep</div></NavLink>
                <NavLink to={`/release-calendar/10`} activeClassName={style.active} className={style.link}><div>Oct</div></NavLink>
                <NavLink to={`/release-calendar/11`} activeClassName={style.active} className={style.link}><div>Nov</div></NavLink>
                <NavLink to={`/release-calendar/12`} activeClassName={style.active} className={style.link}><div>Dec</div></NavLink>
            </div> : null}
            <div className={style.text}>
                {text}
            </div>
            <div className={style.reactSelect}>
                {isOrder ? null
                    : <SelectBox getResponseElements={getOrderResponseElements} textValue='Order by: '
                        items={[
                            { id: 0, value: '-added', text: 'Popularity' },
                            { id: 1, value: 'name', text: 'Name' },
                            { id: 2, value: 'released', text: 'Released' }
                        ]}
                    />}

                <SelectBox getResponseElements={getPlatformResponseElements} textValue='Platforms: '
                    items={[
                        { id: 0, value: 0, text: 'All' },
                        { id: 1, value: 1, text: 'PC' },
                        { id: 2, value: 2, text: 'PlayStation' },
                        { id: 3, value: 3, text: 'Xbox' },
                        { id: 4, value: 4, text: 'iOS' },
                        { id: 5, value: 5, text: 'Apple Macintosh' },
                        { id: 6, value: 6, text: 'Linux' },
                        { id: 7, value: 7, text: 'Nintendo' },
                        { id: 8, value: 8, text: 'Android' },
                        { id: 9, value: 9, text: 'Atari' },
                        { id: 10, value: 10, text: 'Commodore / Amiga' },
                        { id: 11, value: 11, text: 'SEGA' },
                        { id: 12, value: 12, text: '3DO' },
                        { id: 13, value: 13, text: 'NEO-GEO' },
                        { id: 14, value: 14, text: 'WEB' }
                    ]}
                />
            </div>
            {isLoad ? <img alt='img' src={Loader} /> : <ProductsPage
                prevHttp={prevHttp}
                nextHttp={nextHttp}
                getAgainProducts={getAgainProducts}
                products={products}
            />}
        </div>

    )
}

export default SectionPage