import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const mealsApi = createApi({
  reducerPath: 'mealsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
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