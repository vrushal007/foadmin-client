import React, {Fragment, useState} from "react";
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import {sendCartData, sendOrder} from '../../store/cart-action'
import {Link} from 'react-router-dom';
import {useGetCartQuery, useReplaceCartMutation} from "../../api/cartApi";

const Cart = (props) => {
    console.log("rendered")
    // const cartCtx = useContext(CartContext)
    // const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    // const hasItems = cartCtx.items.length > 0
    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [didSubmit,setDidSubmit] = useState(false)

    const { data:cart, isSuccess } = useGetCartQuery()
    const [updateCart] = useReplaceCartMutation()
    console.log(isSuccess && cart)
    // const items = useSelector(state => state.cart.items)
    // const totalAmount = useSelector(state=>state.cart.totalAmount)
    // const hasItems = useSelector(state=>state.cart.items.length > 0)
    // const dispatch = useDispatch()

    const cartItemAddHandler = item => {
        console.log("item:",item)
        // dispatch(cartActions.addItem({
        //     ...item,
        //     amount:1
        // }));
        const findItem = cart.items.find(itm=>itm._id === item._id)
        const updatedCartItem = findItem && {
            ...findItem,
            amount:findItem.amount + 1
        }
        const updatedItems = updatedCartItem ? cart.items.map((itm)=>{
            if(itm._id === item._id){
                return updatedCartItem
            }else{
                return itm;
            }
        }) : cart.items.concat(item)
        const updatedCart = {
            totalAmount:(cart.totalAmount + item.price),
            totalQuantity:cart.totalQuantity + 1,
            items: updatedItems,
            _id:cart._id
        }
        updateCart(updatedCart)
    };
    const cartItemRemoveHandler = id => {
        // dispatch(cartActions.removeItem(id))
    };
    const orderHandler = () => {
      setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        // await fetch(`${DATABASE_URL}/orders`,{
        //     method:"POST",
        //     body:JSON.stringify({
        //         user:userData,
        //         orderedItems:items,
        //         totalAmount:totalAmount
        //     })
        // })
        sendOrder({
            user:userData,
            orderedItems:cart.items,
            totalAmount:cart.totalAmount
        })
        .then((data)=>{
            console.log(data)
        })
        // dispatch(cartActions.replaceCart({
        //     items:[],
        //     totalAmount:0,
        //     totaQuantity:0
        // }))
        // dispatch(sendCartData({
        //     items:[],
        //     totalAmount:0,
        //     totaQuantity:0
        // }))

        setIsSubmitting(false)
        setDidSubmit(true)
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {isSuccess && cart.items.map((item) => (
                <CartItem
                   key={item._id}
                   _id={item._id}
                   name={item.name}
                   amount={item.amount}
                   price={item.price}
                   onRemove={cartItemRemoveHandler.bind(null,item._id)}
                   onAdd={cartItemAddHandler.bind(null,item)}
               />
            ))}
        </ul>
    );

    const ModalActions = <div className={classes.actions}>
         <Link to='/'>
            <button className={classes['button--alt']}>
                Close
            </button>
        </Link>
        {isSuccess && cart.items.length>0 && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = <Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>&#x20B9; {isSuccess && cart.totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler}/>}
        {!isCheckout && ModalActions}
    </Fragment>

    const isSubmittingModalContent = <p>Sending order...</p>
    const didSubmitModalContent =<Fragment>
        <p>Order has sent successfully...</p>
        <div className={classes.actions}>
            <Link to='/'>
                <button className={classes['button--alt']}>
                    Close
                </button>
            </Link>
        </div>
    </Fragment>

    return (
        <Modal onHide={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && !didSubmit && isSubmittingModalContent}
            {didSubmit && !isSubmitting && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
