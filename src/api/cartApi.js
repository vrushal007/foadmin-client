import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: builder => ({
    getCart: builder.query({
      query: () => `/cart`
    }),
    replaceCart: builder.mutation({
      query: (cart) => ({
        url:'/cart',
        method: 'PUT',
        body: cart
      })
    })
  })
})

export const { useGetCartQuery, useReplaceCartMutation } = cartApi
