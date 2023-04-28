import React, { useState, useEffect } from 'react';
import style from './NavBar.module.css';
import Variables from '../Variables/Variables.module.css'
import { NavLink } from 'react-router-dom';


export default function NavBar () {

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 0) {
        setIsSticky(true);
        } else {
        setIsSticky(false);
        }
    };

    return (

        <header class={style.header}>
            <NavLink to={'/Home'} className={style.inicio}>
                <a href="#" class={style.logo}>j0ak!</a>
            </NavLink>
            
            <nav className={style.navbar}>
                <NavLink to={'/Home'} className={style.inicio}>
                    <a className={style.btn}>Home</a>
                </NavLink>
                <NavLink to={'/Recipes'} className={style.cards}>
                    <a className={style.btn}>Recipes</a>
                </NavLink>
                <NavLink to={'/Diets'} className={style.favorites}>
                    <a className={style.btn}>Diets</a>
                </NavLink>
                <NavLink to={'/Favorites'} className={style.favorites}>
                    <a className={style.btn}>Favorites</a>
                </NavLink>
                <NavLink to={'/About'} className={style.about}>
                    <a className={style.btn}>About</a>
                </NavLink>
            </nav>

            {/* <div class="bx bx-menu" id="menu-icon"></div> */}
        </header>
    )
}