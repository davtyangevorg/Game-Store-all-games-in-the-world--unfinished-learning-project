import React from 'react'
import style from './sectionPageForBrowse.module.scss'

import { useEffect, useState } from 'react'

import Loader from '../../../img/svg/loader.svg'
import SelectBox from '../select-box/select-box.jsx'
import ProductsPage from '../productsPage/productsPageContainer.jsx'





const SectionPage = (props) => {
    //console.log(props.browseInfo)
    const [order, setOrder] = useState('-added')
    const [platform] = useState(0)

    useEffect(() => {
        if (props.browseInfo.id) {
            props.getProducts(order, platform, props.browseInfo.id)
        }
    }, [order, platform,props])

    const getOrderResponseElements = (value) => {
        if (value === '-added' && order === '-added') {
            return
        }
        else {
            setOrder(value)
            props.getProducts(value, platform, props.browseInfo.id)
        }
    }
    // const getPlatformResponseElements = (value) => {
    //     if (value === 1 && platform === 1) {
    //         return
    //     }
    //     else {
    //         setPlatform(value)
    //         props.getProducts(order, value)
    //     }
    // }
    // {props.type && console.log(document.body.style.backgroundColor='red')}
    return (
        <div>
            <div>
                <div className={style.title}>
                    {props.title}
                    {props.type && <img alt='name' className={style.creatorImage} src={props.browseInfo.image}></img>}
                </div>
                {props.type &&
                    <div className={style.positionsParent}>
                        {props.browseInfo.positions && props.browseInfo.positions.map((pos, index) => {
                            return <div key={pos.id} className={style.profession}>{pos.name}{props.browseInfo.positions.length - 1 === index ? null : <span>,</span>}</div>
                        })}
                    </div>
                }
                <div className={style.text}>
                    {props.text}
                </div>
                <div className={style.reactSelect}>
                    {props.isOrder ? null : <SelectBox getResponseElements={getOrderResponseElements} textValue='Order by: ' items={[
                        { id: 0, value: '-added', text: 'Popularity' },
                        { id: 1, value: 'name', text: 'Name' },
                        { id: 2, value: 'released', text: 'Released' }
                    ]} />}


                </div>
                {props.isLoad ? <img alt='img' src={Loader} /> : <ProductsPage
                    prevHttp={props.prevHttp}
                    nextHttp={props.nextHttp}
                    getAgainProducts={props.getAgainProducts}
                    products={props.products}
                />}
            </div>
        </div>
    )
}

export default SectionPage