import style from './Footer.module.css'


export default function Footer (props) {


    return (
        <div className={props.isCreated === true ? style.hide : style.container}>
            <div className={style.contact}>
                <h1 className={`${style.h1} ${style.contactUs}`}>Contact <span className={style.span}>Us:</span></h1>
                <h3 className={style.h3}>examplemail@gmail.com</h3>
                <h3 className={style.h3}>+54 9 2804 33 3691</h3>
                <h3 className={style.h3}>Fake street 123</h3>
            </div>
            <div className={style.social}>
                <h1 className={`${style.h1} ${style.socialMedia}`}>Social <span className={style.span}>Media:</span> </h1>
                <h3 className={style.h3}><a href="">Instagram</a></h3>
                <h3 className={style.h3}><a href="">Facebook</a></h3>
                <h3 className={style.h3}><a href="">YouTube</a></h3>
            </div>
            <div className={style.info}>
                <h1 className={`${style.h1} ${style.information}`}>More <span className={style.span}>Info:</span> </h1>
                <h3 className={style.h3}><a href="">About Us</a></h3>
                <h3 className={style.h3}><a href="">Our Locations</a></h3>
                <h3 className={style.h3}><a href="">Some Extra Info</a></h3>
            </div>
        </div>
    )
}