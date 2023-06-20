import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const SERVER_URL = 'http://localhost:3001'
const SERVER_URL = 'https://foadminserver.onrender.com'

export const mealsApi = createApi({
  reducerPath: 'mealsApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: builder => ({
    fetchMeals: builder.query({
        query: () => '/meals'
    }),
    createMeals: builder.mutation({
        query: (meal) => ({
            url:'/meals',
            method:'POST',
            body: meal
        })
    })
  })
})

export const { useFetchMealsQuery, useCreateMealsMutation } = mealsApi