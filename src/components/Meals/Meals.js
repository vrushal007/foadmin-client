import React, {Fragment} from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";
import classes from './Meals.module.css'
import mealsImage from '../../assets/meals.jpg'

const Meals = () => {
    return <Fragment>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt=""/>
        </div>
        <MealsSummary />
        <AvailableMeals />
    </Fragment>
}
export default Meals;
