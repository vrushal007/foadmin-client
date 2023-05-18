import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"
import axios from 'axios'

const DATABASE_URL = "https://foadminserver.onrender.com"
// const DATABASE_URL = "http://localhost:3001"

export const fetchCartData = () => {
    return async (dispatch) => {
      const fetchData = async () => {
          // const response = await fetch('/cart.json')
          const response = await fetch(`${DATABASE_URL}/cart`)
          if(!response.ok){
              throw new Error('Failed to fetch cart data!!');
          }
          const responseData = await response.json();
  
          return responseData[0];
      }
      try{
          const cartData = await fetchData();
          // console.log("cartdata:",cartData)
          dispatch(cartActions.replaceCart({
            items:cartData.items || [],
            totalQuantity:cartData.totalQuantity,
            totalAmount:cartData.totalAmount
          }));
      }catch(err){
          console.log(err);
          dispatch(uiActions.showNotification({
              status:'error',
              title:'Error!!',
              message:'Fetching cart data failed!!'
          }))
      }
    }
}
export const sendCartData = (cart) => {
  return async (dispatch) =>{
    dispatch(uiActions.showNotification({
      status:'pending',
      title:'Sending',
      message:'Sending cart data...'
    }))

    const sendRequest = async () => {
      // console.log("cart:",cart)
      const response = await axios.put(`${DATABASE_URL}/cart`,cart)

      // const response = await fetch(`${DATABASE_URL}/cart`,{
      //   method:'PUT',
      //   body:JSON.stringify({
      //     items:cart.items,
      //     totalQuantity:cart.totalQuantity,
      //     totalAmount:cart.totalAmount,
      //   })
        // body:{
        //   items:cart.items,
        //   totalQuantity:cart.totalQuantity,
        //   totalAmount:cart.totalAmount,
        //   _id:cart._id
        // }
      // });
      
      // console.log("response:",response.data)
      dispatch(cartActions.updateCart(response.data._id))
      // if(!response.ok){
      //   throw new Error("Sending cart data failed!!")
      // }
    }
    try{
      sendRequest()
      .then((response)=>{
      })
      
      dispatch(uiActions.showNotification({
        status:'success',
        title:'Success...',
        message:'Sending cart data successfully...'
      }))
    }catch(err){
      console.log(err);
      dispatch(uiActions.showNotification({
        status:'error',
        title:'Error!!',
        message:'Sending cart data failed!!'
      }))
    }
  }
}
export const fetchOrders = async () => {
    const response = await fetch(`${DATABASE_URL}/orders`);
    const orders = await response.json()
    // console.log(orders)
    // let ordersList = [];
    // for(let key in orders){
    //   ordersList.push({
    //     id:key,
    //     ...orders[key]
    //   })
    // }
    return orders;
}

export const sendOrder = async (data) => {
  const order = await axios.post(`${DATABASE_URL}/orders`, data)
  return order.data;
}

export const addItem = async (data) => {
  const item = await axios.post(`${DATABASE_URL}/meals`,data)
  return item.data
}

export const fetchMeals = async () => {
  const response = axios.get(`${DATABASE_URL}/meals`)
  return response
}

export const deleteOrder = async (orderId) => {
  const response = axios.delete(`${DATABASE_URL}/orders/${orderId}`)
}