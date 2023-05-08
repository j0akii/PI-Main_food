import style from './Card.module.css';
import { NavLink } from 'react-router-dom';


export default function Card({
        id,
        name,
        image,
        healthScore,
        price,
        diets,
    }) {

   return (
      <div className={`${style.container} ${style.mobile_hover}`} style={{ backgroundImage: `url(${image})` }}>
         <div className={`${style.text} ${style.text_2}`}>
            <h1 className={style.h1}>{name}</h1>
            <h2 className={style.h2}>Health Score: {healthScore}</h2>
            <p className={style.h2}>{diets.map((diet) => '#' + diet + ', ')}</p>
            <NavLink className={style.navStyle} to={`./Detail/${id}`}>
               <button className={style.btn}>See Detail</button>
            </NavLink>
         </div>
         <label className={style.label}>{price + '$'}</label>
      </div>
   );
}