import React from 'react'
import style from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import image from '../../images/menu-4.png'


export default function Home () {
    const nav = useNavigate();
    const navigation = () => {
        nav('/Recipes')
    }
    
    const navigationId = (req) => {
        console.log(req)
        nav(`/Detail/${req}`)
    }


    return (    
        <div className={style.container}>
            <section className={`${style.section} ${style.head}`}>
                <h1 className={style.h1}>Welcome To Recipe Master!</h1>
                <p className={style.p}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur modi iste pariatur voluptatum necessitatibus debitis quas vel, repudiandae ducimus fugit officiis, ullam id odit iusto animi minus quaerat corporis nesciunt!</p>
                <button className={style.btn} onClick={navigation}>
                    <span className={`${style.text} ${style.text_1}`}>Get started</span>
                    <span className={`${style.text} ${style.text_2} `} aria-hidden="true">Get started</span>
                </button>
            </section>

            <section className={`${style.section} ${style.recomendated}`}>
                <p className={style.p}>Our Specials</p>
                <i className={style.i}></i>
                <h1 className={style.h1}>House <span className={style.span}>Recommendations</span></h1>

                <div className={style.container}>
                    <div className={style.card} onClick={navigationId}>
                        <img className={style.img} src={image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>Milanesa Napolitana</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>50.99$</h1>
                            </div>
                            <p className={style.p}>Lorem ipsum dolor laboriosam vitae aliquam sint facere consequuntur vel reiciendis.</p>
                        </div>
                    </div>
                    <div className={style.card}>
                        <img className={style.img} src={image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>Example</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>24.99$</h1>
                            </div>
                            <p className={style.p}>Lorem ipsum dolor laboriosam vitae aliquam sint facere consequuntur vel reiciendis.</p>
                        </div>
                    </div>
                    <div className={style.card}>
                        <img className={style.img} src={image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>PIP</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>2.99$</h1>
                            </div>
                            <p className={style.p}>Lorem ipsum dolor laboriosam vitae aliquam sint facere consequuntur vel reiciendis.</p>
                        </div>
                    </div>
                    <div className={style.card}>
                        <img className={style.img} src={image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>Ejemplo mas extenso digamos</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>134.99$</h1>
                            </div>
                            <p className={style.p}>Lorem ipsum dolor laboriosam vitae aliquam sint facere consequuntur vel reiciendis.</p>
                        </div>
                    </div>
                    <div className={style.card}>
                        <img className={style.img} src={image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>Ejemplo normal digamos</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>2400.99$</h1>
                            </div>
                            <p className={style.p}>Lorem ipsum dolor laboriosam vitae aliquam sint facere consequuntur vel reiciendis.</p>
                        </div>
                    </div>
                    <div className={style.card}>
                        <img className={style.img} src={image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>Example Title</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>24.99$</h1>
                            </div>
                            <p className={style.p}>Lorem ipsum dolor laboriosam vitae aliquam sint facere consequuntur vel reiciendis.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
