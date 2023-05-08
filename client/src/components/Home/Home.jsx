import { useEffect } from 'react'
import style from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import image from '../../images/menu-4.png'
import { useSelector, useDispatch } from 'react-redux'
import { getAllRecipes} from '../../redux/actions'


export default function Home () {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.allRecipes);

    const nav = useNavigate();
    const navigation = () => {
        nav('/Recipes')
    }
    
    const navigationId = (req) => {
        console.log(req)
        nav(`/Detail/${req}`)
    }

    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);


    return (    
        <div className={style.container}>
            <section className={`${style.section} ${style.head}`}>
                <h1 className={style.h1}>Welcome To Recipe Master!</h1>
                <p className={style.p}>Welcome to my page! This is a page that receives recipes from an API and you can also add the recipes you consider necessary to complement the recipes stored on this page. All the recipes you create will be stored in our database. To see all our recipes, click below:</p>
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
                        <img className={style.img} src={recipes.length && recipes[0].image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>{recipes.length && recipes[0].name}</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>{recipes.length && recipes[0].price}$</h1>
                            </div>
                            <p className={style.p}>{recipes.length && recipes[0].summary}</p>
                        </div>
                    </div>
                    <div className={style.card} onClick={navigationId}>
                        <img className={style.img} src={recipes.length && recipes[1].image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>{recipes.length && recipes[1].name}</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>{recipes.length && recipes[1].price}$</h1>
                            </div>
                            <p className={style.p}>{recipes.length && recipes[1].summary}</p>
                        </div>
                    </div>
                    <div className={style.card} onClick={navigationId}>
                        <img className={style.img} src={recipes.length && recipes[2].image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>{recipes.length && recipes[2].name}</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>{recipes.length && recipes[2].price}$</h1>
                            </div>
                            <p className={style.p}>{recipes.length && recipes[2].summary}</p>
                        </div>
                    </div>
                    <div className={style.card} onClick={navigationId}>
                        <img className={style.img} src={recipes.length && recipes[3].image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>{recipes.length && recipes[3].name}</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>{recipes.length && recipes[3].price}$</h1>
                            </div>
                            <p className={style.p}>{recipes.length && recipes[3].summary}</p>
                        </div>
                    </div>
                    <div className={style.card} onClick={navigationId}>
                        <img className={style.img} src={recipes.length && recipes[4].image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>{recipes.length && recipes[4].name}</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>{recipes.length && recipes[4].price}$</h1>
                            </div>
                            <p className={style.p}>{recipes.length && recipes[4].summary}</p>
                        </div>
                    </div>
                    <div className={style.card} onClick={navigationId}>
                        <img className={style.img} src={recipes.length && recipes[5].image}/>
                        <div className={style.content}>
                            <div className={style.title}>
                                <h1 className={style.h1}>{recipes.length && recipes[5].name}</h1>
                                <div className={style.sep}></div>
                                <h1 className={style.price}>{recipes.length && recipes[5].price}$</h1>
                            </div>
                            <p className={style.p}>{recipes.length && recipes[5].summary}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
