import style from './Searchbar.module.css';
import React, { useState } from 'react';

export default function SearchBar (props) {

    const [name, setName] = useState('');

    const handleChange = (event) => {
        setName(event.target.value);
        console.log(event.target.value)
    }

    return (
        <div className={style.container}>
            <input type='search' className={style.input} value={name} onChange={handleChange}/>
            <button className={style.boton} onClick={() => props.onSearch(name)}>Search</button>
        </div>
    )
}