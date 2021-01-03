import React, { useEffect } from 'react'
import style from './productsPage.module.scss'
import Products from './products/products.jsx'

const ProductsPage = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const btnNext = props.nextHttp ?
        <button onClick={() => { props.getAgainProducts(props.nextHttp) }}
            className={style.seeMoreBtnNext}>Next</button>
        : null
    const btnPrev = props.prevHttp ?
        <button onClick={() => { props.getAgainProducts(props.prevHttp) }}
            className={!props.nextHttp ? style.display : style.seeMoreBtnPrev}>Prev
        </button>
        : null
    return (
        <div className={style.products}>
            {props.products.length === 0 ? <div>Not Products</div>
                : <div >
                    <div className={style.exerTop}>
                        {btnPrev}
                        {btnNext}
                    </div>
                    <Products
                        play={props.play}
                        notPlay={props.notPlay}
                        products={props.products}
                    />
                    <div className={style.exerBottom}>
                        {btnPrev}
                        {btnNext}
                    </div>
                </div>
            }
        </div>
    )
}
export default ProductsPage