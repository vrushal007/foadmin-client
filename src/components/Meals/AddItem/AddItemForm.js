import React, {useRef} from 'react'

import classes from './AddItemForm.module.css'
import Card from '../../UI/Card'
import {useNavigate} from 'react-router-dom'
import {addItem} from '../../../store/cart-action'
import {useCreateMealsMutation} from '../../../api/mealsApi'

function AddItemForm() {
  const nameInpRef = useRef()
  const priceInpRef = useRef()
  const descInptRef = useRef()
  const navigate = useNavigate()

  const [createMeals] = useCreateMealsMutation()

  const submithandler = (e) => {
    e.preventDefault();
    const body = {
      name:nameInpRef.current.value,
      description:descInptRef.current.value,
      price:priceInpRef.current.value
    }
    // fetch("https://food-app-react-c2eb2-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json",{
    //   method:"POST",
    //   body: JSON.stringify(body)
    // })
    // .then((data)=>{
    //   console.log("data:",data)
    //   navigate('/')
    // }).catch((err)=>{
    //   console.log("err:",err)
    // })
    // addItem(body)
    // .then((data)=>{
    //   navigate('/')
    // })
    createMeals(body)
  }
  return (
    <div className={classes.container}>
    <Card>
        <form className={classes['form-container']}>
            <input placeholder='title' type='text' ref={nameInpRef} />
            <input placeholder='description' type='text' ref={descInptRef} />
            <input placeholder='price' type='number' ref={priceInpRef} />
            <button className={classes.button} onClick={submithandler}>Add Item</button>
        </form>
    </Card>
    </div>
  )
}

export default AddItemForm