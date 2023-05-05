import React from "react"
import style from './PopUp.module.css'
import image from '../../images/check.png'


export default function PopUp (props) {


    return (
        <div className={style.container}>
            <h1 className={style.h1}>Your Recipe Was Succesfully Created</h1>
            <img className={style.image} src={image} />
            <div className={style.separator}></div>
            <button className={style.btn} onClick={props.onClose}>Continue</button>
        </div>
    )
}