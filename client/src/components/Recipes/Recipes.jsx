import React from 'react';
import style from './Recipes.module.css';
import Card from '../Card/Card';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRecipes } from '../../redux/actions';


export default function Recipes () {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.allRecipes);

    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);

    return (
        <div className={style.container}>
         <div className={style.containerCard}>
            {recipes.map(({id, name, image, summary, healthScore, stepByStep, price, diets}) => {
            return (
                <Card
                    key={id}
                    id={id} 
                    name={name} 
                    summary={summary} 
                    healthScore={healthScore} 
                    stepByStep={stepByStep} 
                    image={image}
                    price={price}
                    diets={diets}
                />
                )
            }) 
         }
         </div>
        </div>
    )
}
