import React, {useEffect, useState} from 'react'
import {fetchOrders} from '../../store/cart-action'
import OrderItem from './OrderItem'
import classes from './Orders.module.css'
import {useNavigate} from 'react-router-dom'

let LOADING = true;
function Orders() {
    const [orders,setOrders] = useState([])
    // const [loading,setIsLoading] = useState(false)
    const [message,setMessage] = useState("")
    const navigate = useNavigate()

    const deleteHandler = (username) => {
        setMessage(`${username}'s order delivered sucessfully!!`)
        navigate('/orders')
    }
    useEffect(()=>{
        // setIsLoading(true)
        fetchOrders()
        .then(data=>{
            LOADING = false;
            setOrders(data)
            // setIsLoading(false)
        })
    },[])
    
    const loadingData = <section className={classes.OrdersLoading}>
         <p> {LOADING ? 'Loading...' : message}</p> 
    </section>

  return (
    <div className={classes.orders}>
        {loadingData}
        {orders.map(item=><OrderItem key={item._id} onDelete={deleteHandler} item={item} />)}
    </div>
  )
}

export default Orders