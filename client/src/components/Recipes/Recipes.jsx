import React from 'react';
import style from './Recipes.module.css';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRecipes } from '../../redux/actions';
import separator from '../../images/Separator-Back.svg'


export default function Recipes () {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.allRecipes);
    const [filtredRecipes, setFiltredRecipes] = useState([]);
    


    const handleOrder = (e) => {
        if (e.target.value === "A") {
            setSelectedDiets({ A: !selectedDiets.A })
            setFiltredRecipes({
                ...filtredRecipes,
                filtredRecipes: filtredRecipes + recipes.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    return 0;
                })
            });
        } 
        else if (e.target.value === "D") {
            if (filtredRecipes.length >= 1) {
                const filtered = filtredRecipes.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                    return 0;
                });
                setSelectedDiets({ D: !selectedDiets.D })
                setFiltredRecipes([...filtered]);
            }
            else {
                const filtered = recipes.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                    return 0;
                });
                setSelectedDiets({ D: !selectedDiets.D })
                setFiltredRecipes([...filtered]);
            }

        }
        else if (e.target.value === "healthScore+") {
            setSelectedDiets({ hplus: !selectedDiets.hplus })
            setFiltredRecipes([
                ...filtredRecipes + recipes.sort((a, b) => b.healthScore - a.healthScore)
            ]);
        } 
        else if (e.target.value === "healthScore-") {
            setSelectedDiets({ hless: !selectedDiets.hless })
            setFiltredRecipes([
                ...filtredRecipes + recipes.sort((a, b) => a.healthScore - b.healthScore)
            ]);
        }
        else if (e.target.value == "Price+") {
            setSelectedDiets({ pplus: !selectedDiets.pplus })
            setFiltredRecipes([
                ...filtredRecipes + recipes.sort((a, b) => b.price - a.price)
            ]);
        } 
        else if (e.target.value == "Price-") {
            setSelectedDiets({ pless: !selectedDiets.pless })
            setFiltredRecipes([
                ...filtredRecipes + recipes.sort((a, b) => a.price - b.price)
            ]);
        }
    }

    const handleType = (e) => {
        switch (e.target.value) {
            case 'DB':
                setSelectedDiets({ DB: !selectedDiets.DB })
                return setFiltredRecipes(recipes.filter((recipe) => typeof recipe.id !== 'number'))

            case 'API':
                setSelectedDiets({ API: !selectedDiets.API })
                return setFiltredRecipes(recipes.filter((recipe) => typeof recipe.id === 'number'))

            default:
                setSelectedDiets({ ALL: !selectedDiets.ALL })
                return setFiltredRecipes(recipes);
        }
    }

    const [currentPage, setCurrentPage] = useState(1);

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
            className={currentPage === i ? style.actual : style.btn}
            >
            {i}
            </button>
        );
        }

        if (endPage < totalPages) {
        pageButtons.push(
            <button key="ellipsis" className={style.elipsis}>...</button>
        );
        pageButtons.push(
            <button
            key={totalPages}
            onClick={() => handlePageClick(totalPages)}
            className={style.btn}
            >
            {totalPages}
            </button>
        );
        }

        return pageButtons;
    };

    const [showMoreState, setShowMoreState] = useState(true);

    const showMore = () => {
        setShowMoreState(!showMoreState)
    }

    const [selectedDiets, setSelectedDiets] = useState({});

    const handleDietsFilter = (event) => {
        const diet = event.target.value;
        const isChecked = event.target.checked;

        setSelectedDiets((prevSelectedDiets) => ({
            ...prevSelectedDiets,
            [diet]: isChecked,
        }));
    };

    const setDietsFilter = () => {
        const selectedDietKeys = Object.keys(selectedDiets).filter((key) => selectedDiets[key]);

        if (selectedDietKeys.length === 0) {
            setFiltredRecipes(recipes);
            return;
        }

        const filtered = recipes.filter((recipe) => {
            return selectedDietKeys.every((diet) => {
            return recipe.diets.includes(diet.toLowerCase());
            });
        });

        setFiltredRecipes([...filtered]);
    };

    useEffect(() => {
        setDietsFilter();
        console.log(recipes)
        console.log(filtredRecipes)
    }, [selectedDiets])

    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);

    const spacedWords = { Vegetarian: 'Lacto Ovo Vegetarian', Fodmap: 'Fodmap Friendly', Gluten: 'Gluten Free', Dairy: 'Dairy Free', Whole30: 'Whole 30' }

    return (
        <div className={style.container}>
            <section className={style.sectionCards}>
                <div className={style.wrapper}>
                    <SearchBar />
                    <div className={style.separatorBar}></div>
                    <button className={style.btnFilter} onClick={showMore}>
                        <span className={`${style.text} ${style.text_1}`}><i class='bx bx-filter-alt'></i></span>
                        <span className={`${style.text} ${style.text_2}`} aria-hidden="true"><i class='bx bx-filter-alt'></i></span>
                    </button>
                </div>
                <div className={ showMoreState ? style.containerFilters : `${style.containerFilters} ${style.containerFiltersShow}`}>
                        <div className={style.dietsFilter}>
                            <h1 className={style.dietsTitle}>Select Order:</h1>
                            <div className={style.dietsFilterCont}>
                                <label className={selectedDiets.A ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Ascendent
                                    <input className={style.option} onChange={handleOrder} type='checkbox' value="A" />
                                </label>
                                <label className={selectedDiets.hplus ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Healthier
                                    <input className={style.option} onChange={handleOrder} type='checkbox' value="healthScore+" />
                                </label> 
                                <label className={selectedDiets.pplus ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Expensive
                                    <input className={style.option} onChange={handleOrder} type='checkbox' value="Price+" />
                                </label>    
                                <label className={selectedDiets.D ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Descending
                                    <input className={style.option} onChange={handleOrder} type='checkbox' value="D" />
                                </label>
                                <label className={selectedDiets.hless ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Less Healthy
                                    <input className={style.option} onChange={handleOrder} type='checkbox' value="healthScore-" />
                                </label>
                                <label className={selectedDiets.pless ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Economic
                                    <input className={style.option} onChange={handleOrder} type='checkbox' value="Price-" />
                                </label>
                            </div>
                        </div>
                        <div className={style.separator1}></div>
                        <div className={style.dietsFilter}>
                            <h1 className={style.dietsTitle}>Select Diet:</h1>
                            <div className={style.dietsFilterCont}>
                                <label className={selectedDiets.Vegan ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Vegan
                                    <input className={style.option} type='checkbox' value="Vegan" onChange={handleDietsFilter}/>
                                </label>
                                <label className={selectedDiets[spacedWords.Vegetarian] ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Vegetarian
                                    <input className={style.option} type='checkbox' value="Lacto Ovo Vegetarian" onChange={handleDietsFilter}/>
                                </label>
                                <label className={selectedDiets[spacedWords.Fodmap] ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Fodmap F.
                                    <input className={style.option} type='checkbox' value="Fodmap Friendly" onChange={handleDietsFilter}/>
                                </label>
                                <label className={selectedDiets.Ketogenic ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Ketogenic
                                    <input className={style.option} type='checkbox' value="Ketogenic" onChange={handleDietsFilter}/>
                                </label>
                                <label className={selectedDiets[spacedWords.Gluten] ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Gluten Free
                                    <input className={style.option} type='checkbox' value="Gluten Free" onChange={handleDietsFilter}/>
                                </label>
                                <label className={selectedDiets[spacedWords.Dairy] ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Dairy Free
                                    <input className={style.option} type='checkbox' value="Dairy Free" onChange={handleDietsFilter}/>
                                </label>
                                <label className={selectedDiets.Paleolithic ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Paleolithic
                                    <input className={style.option} type='checkbox' value="Paleolithic" onChange={handleDietsFilter}/>
                                </label>
                                <label className={selectedDiets.Primal ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Primal
                                    <input className={style.option} type='checkbox' value="Primal" onChange={handleDietsFilter}/>
                                </label>
                                <label className={selectedDiets[spacedWords.Whole30] ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Whole30
                                    <input className={style.option} type='checkbox' value="Whole 30" onChange={handleDietsFilter}/>
                                </label>
                            </div>
                        </div>
                        <div className={style.separator2}></div>
                        <div className={style.dietsFilter}>
                            <h1 className={style.dietsTitle}>Select Type:</h1>
                            <div className={style.dietsFilterCont}>
                                <label className={selectedDiets.ALL ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>All Recipes
                                    <input className={style.option} onChange={handleType} type='checkbox' value="" />
                                </label>
                                <label className={selectedDiets.DB ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Your Recipes
                                    <input className={style.option} onChange={handleType} type='checkbox' value="DB" />
                                </label>
                                <label className={selectedDiets.API ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Api Recipes
                                    <input className={style.option} onChange={handleType} type='checkbox' value="API" />
                                </label>
                            </div>
                        </div>
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

                <div className={style.pagination}>
                    <button
                    className={style.btnPrev}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    >
                    &laquo; Prev
                    </button>

                    {renderPageButtons()}

                    <button
                    className={style.btnNext}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    >
                    Next &raquo;
                    </button>
                </div>
            </section>
            <section className={style.sectionInfo}>
                <div className={style.containerInfo}>
                    <div className={style.icon1}>
                        <div className={style.img1}></div>
                        <div className={style.iconContent}>
                            <span className={style.span1}>We only recommend ingredients of the highest possible quality</span>
                            <div className={style.separatorInfo1}></div>
                            <div className={style.separatorInfo2}></div>
                            <div className={style.separatorInfo3}></div>
                        </div>
                    </div>
                    <div className={style.icon2}>
                        <div className={style.img2}></div>
                        <div className={style.iconContent}>
                            <span className={style.span2}>We work with the best restaurants in the area, and we also receive their advice.</span>
                            <div className={style.separatorInfo1}></div>
                            <div className={style.separatorInfo2}></div>
                            <div className={style.separatorInfo3}></div>
                        </div>
                    </div>
                    <div className={style.icon3}>
                        <div className={style.img3}></div>
                        <div className={style.iconContent}>
                            <span className={style.span3}>Recipes elaborated and designed by our best chefs worldwide.</span>
                            <div className={style.separatorInfo1}></div>
                            <div className={style.separatorInfo2}></div>
                            <div className={style.separatorInfo3}></div>
                        </div>
                    </div>
                    <div className={style.icon4}>
                        <div className={style.img4}></div>
                        <div className={style.iconContent}>
                            <span className={style.span4}>Free, all our content is completely free and available to everyone.</span>
                            <div className={style.separatorInfo1}></div>
                            <div className={style.separatorInfo2}></div>
                            <div className={style.separatorInfo3}></div>
                        </div>
                    </div>
                </div>
                <img className={style.separatorImg} src={separator} />
                <div className={style.imgback}></div>
            </section>
        </div>
    )
}
