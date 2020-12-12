import React from 'react'
import style from './sectionPageForBrowse.module.scss'

import {useEffect,useState} from 'react'

import Loader from '../../../img/svg/loader.svg'
import SelectBox from '../select-box/select-box.jsx'
import ProductsPage from '../productsPage/productsPageContainer.jsx'





const SectionPage=(props)=>{
    //console.log(props.browseInfo)
    const [order,setOrder]=useState('-added')
    const [platform,setPlatform]=useState(0)

    useEffect(() => {
        if(props.browseInfo.id){
            props.getProducts(order,platform,props.browseInfo.id)
        }
    },[props.browseInfo.id])
    
    const getOrderResponseElements=(value)=>{
        if(value==='-added'&&order==='-added'){
            return
        }
        else{
            setOrder(value)
            props.getProducts(value,platform,props.browseInfo.id)
        }
    }
    const getPlatformResponseElements=(value)=>{
        if(value===1&&platform===1){
            return
        }
        else{
            setPlatform(value)
            props.getProducts(order,value)
        }
    }
    // {props.type && console.log(document.body.style.backgroundColor='red')}
    return(
        <div>
            <div>
                        <div className={style.title}>
                            {props.title}
                            {props.type && <img alt='name' className={style.creatorImage} src={props.browseInfo.image}></img>}
                        </div>
                        {props.type && 
                            <div className={style.positionsParent}>
                                {props.browseInfo.positions && props.browseInfo.positions.map((pos,index)=>{
                                    return <div key={pos.id} className={style.profession}>{pos.name}{props.browseInfo.positions.length-1===index ? null : <span>,</span>}</div>
                                })}
                            </div>
                        }
                        <div className={style.text}>
                            {props.text}
                        </div>
                        <div className={style.reactSelect}>
                            {props.isOrder ?  null : <SelectBox getResponseElements={getOrderResponseElements} textValue='Order by: ' items={[
                                {id:0,value:'-added',text:'Popularity'},
                                {id:1,value:'name',text:'Name'},
                                {id:2,value:'released',text:'Released'}
                            ]} /> }

                            {/* {props.parentPlatforms.length>0 && <SelectBox getResponseElements={getPlatformResponseElements}  textValue='PLatforms: ' items={props.parentPlatforms} /> } */}
                            {/* {props.type && <SelectBox getResponseElements={getPlatformResponseElements}  textValue='PLatforms: ' items={[
                                {id:0,value:0,text:''},
                                {id:1,value:1,text:'PC'},
                                {id:2,value:2,text:'PlayStation'},
                                {id:3,value:3,text:'Xbox'},
                                {id:4,value:4,text:'iOS'},
                                {id:5,value:5,text:'Apple Macintosh'},
                                {id:6,value:6,text:'Linux'},
                                {id:7,value:7,text:'Nintendo'},
                                {id:8,value:8,text:'Android'},
                                {id:9,value:9,text:'Atari'},
                                {id:10,value:10,text:'Commodore / Amiga'},
                                {id:11,value:11,text:'SEGA'},
                                {id:12,value:12,text:'3DO'},
                                {id:13,value:13,text:'NEO-GEO'},
                                {id:14,value:14,text:'WEB'}
                            ]} />} */}
                            
                        </div>
                        {props.isLoad ? <img alt='img' src={Loader}/> : <ProductsPage
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