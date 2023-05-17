import React from "react"
import Card from "../UI/Card"
import classes from './OrderItem.module.css'

// const FIREBASE_LINK = `https://food-app-react-c2eb2-default-rtdb.asia-southeast1.firebasedatabase.app`
const DATABASE_URL = "http://localhost:3001"
function OrderItem(props) {
    const deleteOrderHandler = () => {
        fetch(`${DATABASE_URL}/orders/${props.item.id}`,{
            method:'DELETE'
        })
        .then(()=>{
            props.onDelete(props.item.user.name);
        })
    }
    console.log(props)
        /*
    {
    "id": "-NMDsQvaoF6P-a8xaeRu",
    "orderedItems": [
        {
            "amount": 1,
            "id": "m1",
            "name": "Dabeli",
            "price": 35
        },
        {
            "amount": 1,
            "id": "m2",
            "name": "Vadapav",
            "price": 30
        }
    ],
    "user": {
        "city": "Kadi",
        "name": "Vrushal",
        "postalCode": "382715",
        "street": "AA 19"
    }
}
    */
  return (
    <div className={classes.orders}>
    <Card>
        <div>
            <p>Order no: {props.item._id}</p>
            <p>User name: {props.item.user.name}</p>
            <p>User Address: {props.item.user.street} {props.item.user.city}, {props.item.user.postalCode}</p>
        </div>
        <div>
            <hr />
            <p>Order Details:</p>
            {props.item.orderedItems.map((order)=>{
             return <div>
                <p>{order.name} x{order.amount} = {order.price * order.amount}</p>
                </div>   
            })}
            <hr />
            <p>Order Total: {props.item.totalAmount}</p>
            <span>Delivered?</span>
            <button className={classes.button} onClick={deleteOrderHandler}>Yes</button>
        </div>
        {/* <hr /> */}
    </Card>
    </div>
  )
}

export default OrderItem