import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const SERVER_URL = 'http://localhost:3001'
const SERVER_URL = 'https://foadminserver.onrender.com'

export const cartApi = createApi({
  reducerPath: 'cartApi',
  tagTypes:['Cart'],
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: builder => ({
    getCart: builder.query({
      query: () => `/cart`,
      providesTags:['Cart']
    }),
    replaceCart: builder.mutation({
      query: (cart) => ({
        url:'/cart',
        method: 'PUT',
        body: cart
      }),
      invalidatesTags:['Cart']
    })
  })
})

export const { useGetCartQuery, useReplaceCartMutation } = cartApi
