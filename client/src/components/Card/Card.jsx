import style from './Card.module.css';
import { NavLink } from 'react-router-dom';
import { addFav, removeFav, getIdRecipes } from "../../redux/actions";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function Card({
        id,
        name,
        image,
        summary,
        healthScore,
        price,
        stepByStep,
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