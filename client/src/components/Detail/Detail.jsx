import style from './Detail.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getIdRecipes } from '../../redux/actions'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser';

export default function Detail () {
    const dispatch = useDispatch();
    const { id } = useParams();
    const getRecipe = useSelector(state => state.idRecipe);
    const recipe = getRecipe.length ? getRecipe[0] : {};
    const [summary, setSummary] = useState([]);
    // const [diets, setDiets] = useState([]);
    const [showMoreState, setShowMoreState] = useState(true);

    const showMore = () => {
        setShowMoreState(!showMoreState)
    }

    useEffect(() => {
        dispatch(getIdRecipes(id));
    }, [dispatch])

    // useEffect(() => {
    //     const getDiets = async () => {
    //         const diets = await recipe.diets && recipe.diets.map((diet) => '#' + diet + ', ');
    //         const dietsFinal = [...diets.slice(0, -1), diets[diets.length -1].slice(0, -2)];
    //         setDiets([dietsFinal]);
    //     }
    //     getDiets();
    // }, [recipe.diets])

    useEffect(() => {
        const getSummary = async () => {
            const summary = await recipe.summary && parse(recipe.summary);
            setSummary([summary]);
        }
        getSummary();
    }, [recipe.summary])

    return (
        <div className={style.container}>
            <div className={style.containerContent}>
                <img className={style.img} src={recipe.image} />
                <div className={style.content}>
                    <div className={style.infoContent}>
                        <h1 className={style.price}><i class='bx bx-money' ></i>{recipe.price}</h1>
                        <div className={style.infoSeparator}></div>
                        <h1 className={style.healthData}><i class='bx bxs-leaf'></i>{recipe.healthScore}</h1>
                    </div>
                    <div className={style.titleContainer}>
                        <h1 className={style.title}>{recipe.name}</h1>
                        <div className={style.separator1}></div>
                        <div className={style.separator2}></div>
                        <div className={style.separator3}></div>
                    </div>
                    <h3 className={style.data}>{summary}</h3>
                    {/* <h3 className={style.h2}>{diets}</h3> */}
                    <button className={style.btn} onClick={showMore}>
                        <span className={`${style.text} ${style.text_1}`}>Show Step By Step<i class='bx bxs-down-arrow-square'></i></span>
                        <span className={`${style.text} ${style.text_2}`} aria-hidden="true">Show Step By Step<i class='bx bxs-down-arrow-square'></i></span>
                    </button>
                </div>
            </div>
            <h3 className={showMoreState ? style.desactive : `${style.desactive} ${style.active}`}>{recipe.stepByStep}</h3>
        </div>
    )
}