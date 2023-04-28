import style from './Landing.module.css';
import Variables from '../Variables/Variables.module.css'
import { useNavigate } from 'react-router-dom';


export default function Landing () {
    const nav = useNavigate()
    const navigation = () => {
        nav('/Home')
    }

    return (
        <div className={style.container}>
            <p className={style.p}>Amazing & Delicious</p>
            <i className={style.i}></i>
            <h1 className={style.h1}>Welcome to the master of recipes: here you will find all kinds of recipes.</h1>


            <button className={style.btn} onClick={navigation}>
              <span className={`${style.text} ${style.text_1}`}>View The Recipes</span>
              <span className={`${style.text} ${style.text_2} `} aria-hidden="true">View The Recipes</span>
            </button>
        </div>
    )
}