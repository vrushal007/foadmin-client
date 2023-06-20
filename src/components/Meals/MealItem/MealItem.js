import React from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../store/cart-slice'
import { useGetCartQuery, useReplaceCartMutation } from '../../../api/cartApi'

const MealItem = props => {
  // const cartCtx = useContext(CartContext)
  // const dispatch = useDispatch()
  const price = `${props.price.toFixed(2)}`

  const { data:cart, isSuccess } = useGetCartQuery()
  console.log(cart)
  const [updateCart] = useReplaceCartMutation()
  const addToCartHandler = amount => {
    // cartCtx.addItem({
    // id:props.id,
    // amount:amount,
    // price:props.price,
    // name:props.name
    // });
    // dispatch(cartActions.addItem({
    //     _id:props._id,
    //     amount:amount,
    //     price:props.price,
    //     name:props.name
    // }))
    const findItem = isSuccess && cart.items.find(itm => itm._id === props._id)
    const findIndex = isSuccess && cart.items.findIndex(itm => itm._id === props._id)
    const updatedCartItem = findItem && {
      ...findItem,
      amount: findItem.amount + 1
    }
    console.log('found item:',findItem)
    console.log('updated item:',updatedCartItem)
    const updatedItems = updatedCartItem
      ? cart.items.map(itm => {
          if (itm._id === props._id) {
            return updatedCartItem
          } else {
            return itm
          }
        })
      : cart.items.concat({
          _id: props._id,
          amount: amount,
          price: props.price,
          name: props.name
        })
    const updatedCart = {
      totalAmount: cart.totalAmount + props.price,
      totalQuantity: cart.totalQuantity + 1,
      items: updatedItems,
      _id: cart._id
    }
    updateCart(updatedCart)
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}> &#x20B9; {price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}
export default MealItem
