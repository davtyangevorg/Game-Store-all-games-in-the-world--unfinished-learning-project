import React, { useEffect } from 'react'
import style from './browseProducts.module.scss'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Platforms = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const spacing = 470
    const product = props.products.map((el) => {
        const games = el.games.filter((game, i) => {
            if (i < 3) {
                return (game)
            }
            return null
        })
        return (
            //className={`${style.product} ${props.routeText==='creators' && style.b}`}
            <div className={style.product} style={props.routeText === 'creators' ? { height: spacing + 'px' } : null} key={el.id}>
                <img alt='name' className={style.backgroundPhoto} src={el.image_background}></img>
                <div className={style.product_inner}>
                    <div alt='name' className={style.product_inner_top}>
                        {props.routeText === 'creators' && <img alt='name' className={style.creatorImage} src={el.image}></img>}
                        <Link to={`/home/games/${props.routeText}/${el.slug}_${el.id}`} className={style.link}><div className={style.product_inner_top_title}>{el.name}</div></Link>
                        {el.year_start ? <div className={style.year_start}>{el.year_start}</div> : null}
                        {props.routeText === 'creators' && <div className={style.professionParent}>
                            {el.positions && el.positions.map((pos, index) => {
                                return <div key={pos.id} className={style.profession}>{pos.name}{el.positions.length - 1 === index ? null : <span>,</span>}</div>
                            })}
                        </div>
                        }

                        <button>Follow</button>
                    </div>
                    <div className={style.product_inner_bottom}>
                        <div className={style.items}>
                            <div>{props.routeText === 'creators' ? 'Known for' : 'Popular items'}</div>
                            <span >{el.games_count}</span>
                        </div>
                        <div>
                            {games.map((game) => {
                                return (
                                    <div className={style.game} key={game.id}>
                                        <div>{game.name}</div>
                                        <div>
                                            <span>{addCommaOrNot(game.added)}</span>
                                            <FaUserAlt size='0.7rem' className={style.user_icon} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    const btnNext = props.nextHttp ? <button onClick={() => { props.getAgainProducts(props.nextHttp) }} className={style.seeMoreBtnNext}>Next</button> : null
    const btnPrev = props.prevHttp ? <button onClick={() => { props.getAgainProducts(props.prevHttp) }} className={!props.nextHttp ? style.display : style.seeMoreBtnPrev}>Prev</button> : null
    return (
        <div className={style.pro}>
            <div className={style.exerTop}>
                {btnPrev}
                {btnNext}
            </div>
            <div>
                <h1 className={style.title}>{props.routeText}</h1>
                <div className={style.products}>
                    {product}
                </div>
            </div>
            <div className={style.exerBottom}>
                {btnPrev}
                {btnNext}
            </div>
        </div>
    )
}
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
export default Platforms
