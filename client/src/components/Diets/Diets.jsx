import React from 'react'
import style from './Diets.module.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDiets } from '../../redux/actions';


export default function Diets () {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.allDiets);

    useEffect(() => {
        dispatch(getAllDiets());
    }, [dispatch]);

    console.log(diets)

    return (
        <div className="container">
            {diets.map((diet) => {
                return (
                    <div className="diet">
                        <h1 className="name">
                            {diet.name}
                        </h1>
                    </div>
                )
            })}
        </div>
    )
}