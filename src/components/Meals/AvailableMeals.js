import React, {useEffect, useState} from "react";
import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const DATABASE_URL = "http://localhost:3001"

const AvailableMeals = () => {
    const [meals,setMeals] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [httpError,setHttpError] = useState()
    useEffect( ()=>{

        const fetchMeals = async () => {
            setIsLoading(true)
            // const response = await fetch(`${DATABASE_URL}/meals`)
            // if(!(response.ok)){
            //     throw new Error("Something went wrong!!")
            // }
            // const responseData = await response.json()
            const meals = await fetchMeals()
            // const loadedMeals = []
            // for(const key in responseData){
            //     loadedMeals.push({
            //         id:key,
            //         name:responseData[key].name,
            //         description:responseData[key].description,
            //         price:+responseData[key].price
            //     });
            // }
            // console.log("loaded meals",loadedMeals)
            setMeals(meals);
            setIsLoading(false)
        }

        fetchMeals()
            .catch((err)=>{
                setIsLoading(false)
                setHttpError(err.message)
            })
    },[])

    const mealsList = meals.map((meal) =>
        <MealItem
            key={meal._id}
            _id={meal._id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    )

    if(isLoading){
        return <section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>
    }
    if(httpError){
        return <section className={classes.MealsError}>
            <p>{httpError}</p>
        </section>
    }
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;