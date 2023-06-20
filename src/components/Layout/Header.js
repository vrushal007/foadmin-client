import React, {Fragment, useEffect, useState} from "react";
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux"
import {fetchOrders} from "../../store/cart-action";
import {useGetCartQuery} from "../../api/cartApi";

const Header = (props) => {
    // const items = useSelector(state => state.cart.items)
    const {data} = useGetCartQuery()
    const numberOfCartItems = 0 
    //  data.items.reduce((curNumber, item) => {
    //     return curNumber + item.amount;
    // }, 0);
    const [numberOfOrders,setNumberOfOrders] = useState(0)
    // useEffect(()=>{
    //     fetchOrders()
    //     .then(data=>{
    //         setNumberOfOrders(data.length)
    //     })
    // })
    return <Fragment>
        <header className={classes.header}>
            <Link to='/' id={classes.heading}><h1>HappyMeals</h1></Link>
            <div className={classes.actions}>
            <div className={classes.linkGroup}>
                <Link to='/' style={{textDecoration:'none'}}><a href="/">Home</a></Link>
                <Link to='/addItem' style={{textDecoration:'none'}}><a href="/">Add new item</a></Link>
            </div>
            <div className={classes.btnGroup}>
                <Link to='/cart' style={{textDecoration:'none'}} ><HeaderCartButton title='Your Cart' badgeNo={numberOfCartItems} /></Link>
                <Link to='/orders' style={{textDecoration:'none'}}><HeaderCartButton title='Orders' badgeNo={numberOfOrders} /></Link>
            </div>
            </div>
            
        </header>
    </Fragment>
}
export default Header;