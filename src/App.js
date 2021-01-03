import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useSpring, animated } from 'react-spring';
import style from './App.module.scss';


import loader from './img/svg/preloader.svg'
import img1 from './img/signin/1.jpg'
import img2 from './img/signin/2.jpg'
import img3 from './img/signin/3.jpg'
import img4 from './img/signin/4.jpg'
import img5 from './img/signin/5.jpg'

import Header from './components/Header/header.jsx'
import LeftSidbar from './components/LeftSidbar/leftSidbar.jsx'
import Footer from './components/Footer/footer.jsx'
import WelcomePage from './components/WelcomePage/welcomePage.jsx'
import GameInfo from './components/Routes/GameInfo/gameInfo.jsx'
import SearchGames from './components/Routes/SearchGames/searchGames.jsx'

import SignUpOrSignIn from './components/Features/SignUpOrLogIn/signUpOrLogIn.jsx'

import Home from './components/Routes/Time/Home/homeContainer.jsx'
import LastMonth from './components/Routes/Time/LastMonth/lastMonthContainer.jsx'
import ThisWeek from './components/Routes/Time/ThisWeek/thisWeekContainer.jsx'
import NextWeek from './components/Routes/Time/NextWeek/nextWeekContainer.jsx'
import ReleaseCalendar from './components/Routes/Time/ReleaseCalendar/releaseCalendarContainer.jsx'
import BestOfTheYear from './components/Routes/Time/BestOfTheYear/bestOfTheYearContainer.jsx'
import PopularLastYear from './components/Routes/Time/PopularLastYear/popularLastYearContainer.jsx'
import AllTimeTop250 from './components/Routes/Time/AllTimeTop250/allTimeTop250Container.jsx'

import ProductsOrderdByPlatforms from './components/Routes/OrderedProducts/Platforms/productPlatformContainer.jsx'
import ProductsOrderByStores from './components/Routes/OrderedProducts/Stores/productStoresContinaer.jsx'
import ProductsOrderByGenres from './components/Routes/OrderedProducts/Genres/productGenresContainer.jsx'
import ProductsOrderByTags from './components/Routes/OrderedProducts/Tags/productTagsContainer.jsx'
import ProductsOrderByDevelopers from './components/Routes/OrderedProducts/Developers/productDevelopersContainer.jsx'
import ProductsOrderByPublishers from './components/Routes/OrderedProducts/Publishers/productPublishersContainer.jsx'
import ProductsOrderByCreators from './components/Routes/OrderedProducts/Creators/productCreatorsContainer.jsx'
//----------------------------------browse----------------------------------------------------
import Platforms from './components/Routes/Browse/platformsContainer.jsx'
import Stores from './components/Routes/Browse/storesContainer.jsx'
import Genres from './components/Routes/Browse/genresContainer.jsx'
import Tags from './components/Routes/Browse/tagsContainer.jsx'
import Developers from './components/Routes/Browse/developersContainer.jsx'
import Publishers from './components/Routes/Browse/publishersContainer.jsx'
import Creators from './components/Routes/Browse/creatorsContainer.jsx'
//----------------------------------other routes---------------------------------------------------



import { IsModalContext, YouTubeVideoUrlContext } from './context.js'
import { authenticationActionCreator, logOutActionCreator } from './redux/auth-reduser.js'

const firebase = require('firebase/app');
require('firebase/auth');


function App() {
  console.log('app')
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuth)
  const browseBackgroundImage = useSelector(state => state.browse.creatorBackgroundImage)
  const gameBackgroundImage = useSelector(state => state.gamesInfo.backgroundImg)

  const [isModal, setIsModal] = useState(false)
  const [youtubeName, setYouTubeName] = useState(null)

  const [isPathGames, setIsPathGames] = useState(false)
  const [isPathSignIn, setIsPathSignIn] = useState(false)

  const [isPathGamesSearch, setIsPathGamesSearch] = useState(false)
  const match = useLocation()

  const [isBackgroundImage, setIsBackgroundImage] = useState(true)
  useEffect(() => {
    const isShowImage = () => {
      if (window.innerWidth <= 1000) return setIsBackgroundImage(false)
      return setIsBackgroundImage(true)
    }
    window.addEventListener('resize', isShowImage)
    return () => { window.removeEventListener('resize', isShowImage) }
  })

  useEffect(() => {
    const arr = match.pathname.split('/')
    arr.find((el) => {
      if (el === 'games') setIsPathGames(true)
    })
    if (match.pathname === '/login' || match.pathname === '/signup') setIsPathSignIn(true)
    arr.find((el) => {
      if (el === 'search') setIsPathGamesSearch(true)
    })
    return () => {
      setIsPathGames(false)
      setIsPathSignIn(false)
      setIsPathGamesSearch(false)
    }
  }, [match.pathname])

  useEffect(() => {
    if (isModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset';
  }, [isModal])

  useEffect(() => {
    let mounted = true
    firebase.auth().onAuthStateChanged((user) => {
      if (mounted) {
        if (user) {
          dispatch(authenticationActionCreator(user.displayName))
        } else {
          dispatch(logOutActionCreator())
        }
      }
    })
    return () => { mounted = false }
  }, [])


  const a = match.pathname.split('/').length === 4 ? `url(${gameBackgroundImage})` : `url(${browseBackgroundImage})`

  return (

    <div className={style.appContainer}>
      {isPathGames ?
        <div style={{ backgroundImage: a }} className={style.appBackground}>
          <div className={style.appBackgroundOpacity}></div>
        </div> : null}
      {isPathSignIn ?
        <div style={isBackgroundImage ? { backgroundImage: `url(${getRandomImage()})` } : { backgroundColor: '#151515' }
        } className={style.signInBackground}>
          <div className={style.signInBackgroundOpacity}></div>
        </div> : null}
      <div className={style.app}>
        <Header />
        <div className={style.appBottom}>
          <Route exact path='/' component={WelcomePage} />
          <div className={style.appBottomInner}>
            <Route path='/home' component={() => <HomePage isModal={isModal}
              setIsModal={setIsModal}
              youtubeName={youtubeName}
              setYouTubeName={setYouTubeName}
              isPathGamesSearch={isPathGamesSearch} />} />
          </div>
          <Route path='/signup' component={() => <SignUpOrSignIn title='Sign up' />}>
            {isAuth && <Redirect to='/home' />}
          </Route>
          <Route path='/login' component={() => <SignUpOrSignIn title='Log in' />}>
            {isAuth && <Redirect to='/home' />}
          </Route>
        </div>
        <PlayFullVideoModal isModal={isModal} setIsModal={setIsModal} youtubeName={youtubeName} />
      </div>
    </div>
  )
}
export default App;



//----------------------------------------------------------------------------------------------------------------------
const imagesSignIn = [img1, img2, img3, img4, img5]
const getRandomImage = () => imagesSignIn[Math.floor(Math.random() * Math.floor(5))]
//----------------------------------------------------------------------------------------------------------------------
const HomePage = ({ isModal, setIsModal, youtubeName, setYouTubeName, isPathGamesSearch }) => {
  return (
    <>
      <LeftSidbar />
      <Footer />
      <div className={style.section}>
        <IsModalContext.Provider value={{ isModal, setIsModal }}>
          <YouTubeVideoUrlContext.Provider value={{ youtubeName, setYouTubeName }}>
            <Route exact path='/home' component={Home} />
            {isPathGamesSearch && <Route component={SearchGames} />}
            <Route path='/home/last-30-days' component={LastMonth} />
            <Route path='/home/this-week' component={ThisWeek} />
            <Route path='/home/next-week' component={NextWeek} />
            <Route path='/home/release-calendar/:month' component={ReleaseCalendar} />
            <Route path='/home/best-of-the-year' component={BestOfTheYear} />
            <Route path='/home/popular-last-year' component={PopularLastYear} />
            <Route path='/home/all-time-top-250' component={AllTimeTop250} />

            <Route path='/home/games/platforms/:platform' component={ProductsOrderdByPlatforms} />
            <Route path='/home/games/stores/:stores' component={ProductsOrderByStores} />
            <Route path='/home/games/genres/:genres' component={ProductsOrderByGenres} />
            <Route path='/home/games/tags/:tags' component={ProductsOrderByTags} />
            <Route path='/home/games/developers/:developers' component={ProductsOrderByDevelopers} />
            <Route path='/home/games/publishers/:publishers' component={ProductsOrderByPublishers} />
            <Route path='/home/games/creators/:creators' component={ProductsOrderByCreators} />
          </YouTubeVideoUrlContext.Provider>
        </IsModalContext.Provider>
        <Route path='/home/platforms' component={Platforms}></Route>
        <Route path='/home/stores' component={Stores}></Route>
        <Route path='/home/genres' component={Genres}></Route>
        <Route path='/home/tags' component={Tags}></Route>
        <Route path='/home/developers' component={Developers}></Route>
        <Route path='/home/publishers' component={Publishers}></Route>
        <Route path='/home/creators' component={Creators}></Route>

        <Route path='/home/games/:gamename' component={GameInfo} />
      </div>
    </>
  )
}


const PlayFullVideoModal = ({ isModal, setIsModal, youtubeName }) => {
  const [isLoadVideo, setIsLoadVideo] = useState(false)
  const fadeVideo = useSpring({
    opacity: isLoadVideo ? 1 : 0,
    config: { duration: 50 }
  })
  const fadeLoader = useSpring({
    opacity: isLoadVideo ? 0 : 1,
    config: { duration: 300 }
  })
  return (
    <>
      {isModal ? <div className={style.modal_bg}>
        <div className={style.modalP}>
          <div onClick={() => { setIsModal(false); setIsLoadVideo(false) }} className={style.modal_btn}>&#10006;</div>
          <animated.div className={style.modal} style={fadeVideo}>
            <iframe onLoad={() => { setIsLoadVideo(true) }} width="100%" height="100%  " src={`https://www.youtube.com/embed/${youtubeName}?autoplay=1&&mute=1`} ></iframe>
          </animated.div>
          <animated.div className={style.modalLoader} style={fadeLoader}>
            <img src={loader}></img>
          </animated.div>
        </div>
      </div> : null
      }
    </>
  )
}