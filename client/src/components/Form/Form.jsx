import style from './Form.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Validations from './Validations'
import { useSelector, useDispatch } from 'react-redux'
import { setValidationErrors } from '../../redux/actions'


export default function Form (props) {
    const dispatch = useDispatch();
    const URL_END = 'http://localhost:3001/recipes/'
    const [showMoreState, setShowMoreState] = useState(true);
    const [validate, setValidate] = useState(false);
    const errors = useSelector(state => state.valErrors);

    const setErrors = (obj) => {
        dispatch(setValidationErrors(obj))
    }

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        healthScore: "",
        summary: "",
        stepByStep: "",
        diet: [],
    });

    const showMore = (e) => {
        e.preventDefault();
        setShowMoreState(!showMoreState);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        Validations({...formData, [name]: value}, errors, setErrors);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createRecipe(formData);
    }

    const createRecipe = async (obj) => {
        await axios.post(URL_END, obj);
        props.setIsCreated(true);
    }

    const spacedWords = { Vegetarian: 'lacto ovo vegetarian', Fodmap: 'fodmap friendly', Gluten: 'gluten free', Dairy: 'dairy free', Whole30: 'whole 30' }

    const [selectedDiets, setSelectedDiets] = useState({});

    const handleDietsFilter = (event) => {
        const diet = event.target.value;
        const isChecked = event.target.checked;

        setSelectedDiets((prevSelectedDiets) => ({
            ...prevSelectedDiets,
            [diet]: isChecked
        }));
    };

    useEffect(() => {
        for (let diet in selectedDiets) {
            if (selectedDiets[diet]) {
                !formData.diet.includes(diet) && setFormData({
                    ...formData,
                    diet: [...formData.diet, diet]
                })
            }
            else {
                formData.diet.length && setFormData({
                    ...formData,
                    diet: formData.diet.filter(d => d != diet)
                });
            }
        };
    }, [selectedDiets]);

    useEffect(() => {
        if (formData.name.length && formData.summary.length && formData.healthScore.length && formData.price.length && formData.diet.length && Object.values(errors).every((error) => error.length === 0)) {
            setValidate(true);
        }
        else if (validate === true) {
            setValidate(false);
        }
    }, [formData]);

    return (
        <div className={props.isCreated ? style.hide : style.container}>
            <div className={style.generalBack}>
                <div className={style.title}>
                    <h1 className={style.h1}>Create Your Recipe:</h1>
                    <div className={style.separator}></div>
                    <div className={`${style.separator} ${style.separator_style}`}></div>
                </div>
                <form className={style.form}>
                    <div className={style.containerInput}>
                        <div className={style.inputGenCont}>
                            <input className={`${style.input} ${style.inputGen}`} type="text" name='name' onChange={handleInputChange} placeholder='Name...' />
                            {formData.name.length && errors.name ? <p className={style.error}>{errors.name}</p> : ''}
                        </div>
                        <div className={style.inputGenCont}>
                            <input className={`${style.input} ${style.inputGen}`} type="text" name='image' onChange={handleInputChange}placeholder='Image...' />
                            {formData.image.length && errors.image ? <p className={style.error}>{errors.image}</p> : ''}
                        </div>
                    </div>
                    <div className={style.containerInput}>   
                        <div className={style.inputGenCont}>
                            <input className={`${style.input} ${style.inputGen}`} type="text" name='price' onChange={handleInputChange}placeholder='Price Per Unity...' />
                            {formData.price.length && errors.price ? <p className={style.error}>{errors.price}</p> : ''}
                        </div>
                        <div className={style.inputGenCont}>
                            <input className={`${style.input} ${style.inputGen}`} type="text" name='healthScore' onChange={handleInputChange}placeholder='Health Score...' />
                            {formData.healthScore.length && errors.healthScore ? <p className={style.error}>{errors.healthScore}</p> : ''}
                        </div>
                    </div>
                    <div className={style.inputGenCont}>
                        <input className={`${style.input2} ${style.inputGen}`} type="text" name='summary' onChange={handleInputChange}placeholder='Summary...' />
                        {formData.summary.length && errors.summary ? <p className={style.error}>{errors.summary}</p> : ''}
                    </div>  
                    <button className={style.btn} onClick={showMore}>
                        <span className={`${style.text} ${style.text_1}`}>Select Diets<i class='bx bxs-down-arrow-square'></i></span>
                        <span className={`${style.text} ${style.text_2}`}>Select Diets<i class='bx bxs-down-arrow-square'></i></span>
                    </button>
                    <div className={style.inputDietsCont}>
                        <div className={ showMoreState ? style.dietsCont : `${style.dietsCont} ${style.show}`}>
                            <label className={selectedDiets.vegan ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Vegan
                                <input className={style.option} type='checkbox' value="vegan" onChange={handleDietsFilter}/>
                            </label>
                            <label className={selectedDiets[spacedWords.Vegetarian] ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Vegetarian
                                <input className={style.option} type='checkbox' value="lacto ovo vegetarian" onChange={handleDietsFilter}/>
                            </label>
                            <label className={selectedDiets[spacedWords.Fodmap] ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Fodmap F.
                                <input className={style.option} type='checkbox' value="fodmap friendly" onChange={handleDietsFilter}/>
                            </label>
                            <label className={selectedDiets.ketogenic ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Ketogenic
                                <input className={style.option} type='checkbox' value="ketogenic" onChange={handleDietsFilter}/>
                            </label>
                            <label className={selectedDiets[spacedWords.Gluten] ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Gluten Free
                                <input className={style.option} type='checkbox' value="gluten free" onChange={handleDietsFilter}/>
                            </label>
                            <label className={selectedDiets[spacedWords.Dairy] ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Dairy Free
                                <input className={style.option} type='checkbox' value="dairy free" onChange={handleDietsFilter}/>
                            </label>
                            <label className={selectedDiets.paleolithic ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Paleolithic
                                <input className={style.option} type='checkbox' value="paleolithic" onChange={handleDietsFilter}/>
                            </label>
                            <label className={selectedDiets.primal ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Primal
                                <input className={style.option} type='checkbox' value="primal" onChange={handleDietsFilter}/>
                            </label>
                            <label className={selectedDiets[spacedWords.Whole30] ? `${style.checkLabel} ${style.checkedLabel}` : style.checkLabel}>Whole30
                                <input className={style.option} type='checkbox' value="whole 30" onChange={handleDietsFilter}/>
                            </label>
                        </div>
                    </div>

                    <div className={style.inputTextCont}>
                        <textarea className={`${style.textarea} ${style.inputGen}`} name="stepByStep" cols="30" rows="10" onChange={handleInputChange} placeholder='Step By Step'></textarea>
                        {formData.stepByStep.length && errors.stepByStep ? <p className={style.error}>{errors.stepByStep}</p> : ''}
                    </div>
                    <button className={validate ? style.btn : `${style.btn} ${style.btnHide}`} onClick={handleSubmit}>
                        <span className={`${style.text} ${style.text_1}`}>Send Recipe</span>
                        <span className={`${style.text} ${style.text_2}`}>Send Recipe</span>
                    </button>
                </form>
            </div>
        </div>
    )
}