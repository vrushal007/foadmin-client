import React, {Fragment, useEffect} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import Notification from './components/UI/Notification'
import { useDispatch,useSelector } from "react-redux";
import {fetchCartData, sendCartData} from './store/cart-action';
import Orders from "./components/Orders/Orders";
import {Routes,Route} from "react-router-dom";
import AddItemForm from "./components/Meals/AddItem/AddItemForm";
import {useGetCartQuery} from "./api/cartApi";

let isInitial = true;

function App() {
    // const dispatch = useDispatch();
    // // const cartIsVisible = useSelector(state => state.ui.cartIsVisible)
    // const cart = useSelector(state => state.cart)
    // const notification = useSelector(state => state.ui.Notification)
    // // console.log(notification);
    // const notiCnt = notification && <Notification
    //     status={notification.status}
    //     message={notification.message}
    //     title={notification.title}
    // />
    // useEffect(()=>{
    //     dispatch(fetchCartData())
    // },[dispatch])

    // useEffect(()=>{
    //     if(isInitial){
    //       isInitial = false;
    //       return;
    //     }
    //     // if(cart.changed){
    //     //   dispatch(sendCartData(cart));
    //     // }
    // },[cart,dispatch])

    // const [cartIsShown,setCartIsShown] = useState(false);

    // const showCartHandler = () => {
    //     setCartIsShown(true);
    // }
    // const hideCartHandler = () => {
    //     setCartIsShown(false);
    // }

    return (
        <Fragment>
            <Header />
            {/* {notiCnt} */}
            <Routes>
                <Route path="/" element={<Meals />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/addItem" element={<AddItemForm />} />
            </Routes>
        </Fragment>
    );
}

export default App;
