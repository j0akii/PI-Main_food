import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './NavBar.module.css';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    const [isSticky, setIsSticky] = useState(false);
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const nav = useNavigate();
    const navigation = () => {
        nav('/Recipes/Form')
    }

    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        setIsSticky(scrollTop > 10);
    };

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <header className={`${style.header} ${isSticky ? style.sticky : ''}`}>
        <a href='#' className={style.logo}>j0aki</a>

        <nav className={`${style.navbar} ${menuOpen ? style.actual : ''}`}>
            <NavLink to={'/Home'} className={style.link}>
                <a className={currentPath === '/Home' ? style.act : style.a}>Home</a>
                <div className={style.separator}></div>
            </NavLink>
            <NavLink to={'/Recipes'} className={style.link}>
                <a className={currentPath.includes('/Recipes') ? style.act : style.a}>Recipes</a>
                <div className={style.separator}></div>
            </NavLink>
            <NavLink to={'/Diets'} className={style.link}>
                <a className={currentPath === '/Diets' ? style.act : style.a}>Diets</a>
                <div className={style.separator}></div>
            </NavLink>
            <NavLink to={'/About'} className={style.link}>
                <a className={currentPath === '/About' ? style.act : style.a}>About</a>
            </NavLink>
        </nav>

        <button className={style.btn} onClick={navigation}>
            <span className={`${style.text} ${style.text_1}`}>Create Your Own!</span>
            <span className={`${style.text} ${style.text_2} `} aria-hidden="true">Create Your Own!</span>
        </button>

        <a className={style.menu_icon} onClick={handleMenu}>
            <i class={menuOpen ? 'bx bx-x' : 'bx bx-menu'}></i>
        </a>
    </header>
  );
}