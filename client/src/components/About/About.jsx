import React from "react";
import style from './About.module.css';


export default function About () {


    return (
        <div className={style.container}>
            <div className={style.containerInfo}>
                <div className={style.title}>
                    <h1 className={style.h1}>About this project</h1>
                    <div className={style.separator}></div>
                    <div className={style.separator_2}></div>
                </div>
                <p className={style.content}>This project is part of one of the two final works that must be completed during the "Henry" course. It's about a SPA (Single Page Application) to which I devoted three weeks of full-time work, as well as all my daily enthusiasm and effort. I'm proud of how I managed to improve in such a short time, but I'm also aware that I have a long learning path ahead. I hope the page is to your liking and I'm completely open to any kind of feedback!</p>
            </div>
        </div>
    )
}