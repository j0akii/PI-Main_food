import style from './Card.module.css';
import { NavLink } from 'react-router-dom';
import { addFav, removeFav } from "../../redux/actions";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavImage from '../../images/Favorite.png'

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

   const dispatch = useDispatch();
   const [isFav, setIsFav] = useState(false);

   const { favRecipes } = useSelector((state) => state)

   const handleFavorite = () => {
      if(isFav) {
         setIsFav(false);
         dispatch(removeFav(id));
      }
      else {
         setIsFav(true);
         dispatch(addFav({
            id, 
            name, 
            summary, 
            healthScore, 
            stepByStep,
            image,
            price
         }));
      }
   }

   useEffect(() => {
      favRecipes.forEach((fav) => {
         if (fav.id == id) {
            setIsFav(true);
         }
      });
   }, [favRecipes])
   
   return (
      <div className={style.container}>
        <img src={image} alt='no cargo' className={style.img}/>
        {isFav ? (
            <button className={style.fav} onClick={handleFavorite}><img src={FavImage} /></button>
        ) : (
            <button className={style.fav} onClick={handleFavorite}><img src={FavImage} /></button>
        )}
        <h1 className={style.h1}>{name}</h1>
        <h2 className={style.h2}>{price + '$'}</h2>
        <h2 className={style.h2}>Health Score: {healthScore}</h2>
        <h2 className={style.h2}>{diets.map((diet) => '#' + diet + ', ')}</h2>
        <NavLink className={style.navStyle} to={`./detail/${id}`}>
            <button className={style.detail}>See Detail</button>
        </NavLink>
      </div>
   );
}