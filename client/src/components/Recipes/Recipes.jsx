import React from 'react';
import style from './Recipes.module.css';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRecipes } from '../../redux/actions';
import { reset, orderRecipes, filterType, filterDiets } from '../../redux/actions';


export default function Recipes () {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.allRecipes);

    const handleOrder = (e) => {
        if (e.target.value == "A") {
            setFiltredRecipes({
                ...filtredRecipes,
                filtredRecipes: filtredRecipes + recipes.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase())
            });
        } 
        else if (e.target.value == "D") {
            setFiltredRecipes({
                ...filtredRecipes,
                filtredRecipes: filtredRecipes + recipes.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase())
            });
        }
        else if (e.target.value == "healthScore+") {
            setFiltredRecipes({
                ...filtredRecipes,
                filtredRecipes: filtredRecipes + recipes.sort((a, b) => b.healthScore - a.healthScore)
            });
        } 
        else if (e.target.value == "healthScore-") {
            setFiltredRecipes({
                ...filtredRecipes,
                filtredRecipes: filtredRecipes + recipes.sort((a, b) => a.healthScore - b.healthScore)
            });
        }
    }

    const handleFIlterType = (e) => {
        e.preventDefault()
        dispatch(filterType(e.target.value))
    }

    const handleFIlterDiets = (e) => {
        e.preventDefault()
        dispatch(filterDiets(e.target.value))
    }

    const resetButton = () => {
        dispatch(reset())
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [filtredRecipes, setFiltredRecipes] = useState([])

    const onSearch = async (Name) => {
        console.log(recipes)
        const response = await recipes.filter((recipe) => recipe.name.toLowerCase().includes(Name.toLowerCase()));
        setFiltredRecipes(response);
        setCurrentPage(1);
    }

    function getCurrentRecipes() {
    const firstIndex = (currentPage - 1) * 9;
    const lastIndex = currentPage * 9;

    return filtredRecipes.length ? filtredRecipes.slice(firstIndex, lastIndex) : recipes.slice(firstIndex, lastIndex);
    }

    function goToPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function goToNextPage() {
        if (currentPage < Math.ceil(filtredRecipes.length ? filtredRecipes.length / 9 : recipes.length / 9)) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filtredRecipes.length ? filtredRecipes.length / 9 : recipes.length / 9);

    const renderPageButtons = () => {
    const pageButtons = [];

    const startPage = Math.max(currentPage - 4, 1);
    const endPage = Math.min(currentPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pageButtons.push(
        <button key="ellipsis">...</button>
      );
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };


    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);

    return (
        <div className={style.container}>
            <div className={style.containerFilters}>
                <SearchBar onSearch={onSearch} />
                    <select className={style.select1} onChange={handleOrder}>
                        <option className={style.option}>Select Order</option>
                        <option className={style.option} value="A">Ascendent</option>
                        <option className={style.option} value="D">Descending</option>
                        <option className={style.option} value="healthScore+">Healthier</option>
                        <option className={style.option} value="healthScore-">Less Healthy</option>
                    </select>
                    <select className={style.select2} onChange={handleFIlterDiets}>
                        <option className={style.option}>Select Diet</option>
                        <option className={style.option} value="Vegan">Vegan</option>
                        <option className={style.option} value="Vegetarian">Vegetarian</option>
                        <option className={style.option} value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                        <option className={style.option} value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                        <option className={style.option} value="Ketogenic">Ketogenic</option>
                        <option className={style.option} value="Gluten Free">Gluten Free</option>
                        <option className={style.option} value="Pescetarian">Pescetarian</option>
                        <option className={style.option} value="Paleolithic">Paleolithic</option>
                        <option className={style.option} value="Primal">Primal</option>
                        <option className={style.option} value="Whole30">Whole30</option>
                    </select>
                    <select className={style.select1} onChange={handleOrder}>
                        <option className={style.option}>Select Type</option>
                        <option className={style.option} value="DB">Data Base Recipes</option>
                        <option className={style.option} value="API">Api Recipes</option>
                    </select>
                    <button className={style.boton} onClick={resetButton}>Reset Filter</button> 
            </div>
         <div className={style.containerCard}>
            {getCurrentRecipes().map(({id, name, image, summary, healthScore, stepByStep, price, diets}) => {
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

            <div className="pagination">
                <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                >
                &laquo; Prev
                </button>

                {renderPageButtons()}

                <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                >
                Next &raquo;
                </button>
            </div>
        </div>
    )
}
