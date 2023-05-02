import style from './Searchbar.module.css';
import React, { useState } from 'react';
import { getAllRecipes } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (event) => {
        setIsError(false)
        setName(event.target.value);
    }

const onSearch = (name) => {
    dispatch(getAllRecipes(name))
        .catch(() => {
        setIsError(!isError);
        });
};

    return (
        <div className={style.container}>
            <input type='search' className={ isError ? style.isError : style.input} value={name} onChange={handleChange}/>
            <button className={style.btn} onClick={() => onSearch(name)}>
                <span className={`${style.text} ${style.text_1}`}><i class='bx bx-search-alt'></i></span>
                <span className={`${style.text} ${style.text_2} `} aria-hidden="true"><i class='bx bx-search-alt'></i></span>
            </button>
        </div>
    )
}