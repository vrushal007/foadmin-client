import React, { useEffect, useState} from 'react';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
    // const cartCtx = useContext(CartContext);
    
    useEffect(()=>{
        setBtnIsHighlighted(true)

        let timer = setTimeout(()=>{
            setBtnIsHighlighted(false)
        },300)

        return () => {
            clearTimeout(timer)
        }
    },[props.badgeNo])
    const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}` ;

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>{props.title}</span>
            <span className={classes.badge}>{props.badgeNo}</span>
        </button>
    );
};

export default HeaderCartButton;