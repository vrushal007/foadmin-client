import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const SERVER_URL = 'http://localhost:3001'
const SERVER_URL = 'https://foadminserver.onrender.com'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  tagTypes:['Orders'],
  endpoints: (builder) => ({
    fetchOrders: builder.query({
      query: () => '/orders',
      providesTags:['Orders']
    }),
    sendOrders: builder.mutation({
      query: orderData => ({
        url: '/orders',
        method: 'POST',
        body: orderData
      }),
      invalidatesTags:['Orders']
    }),
    deleteOrder: builder.mutation({
        query:(id)=>({
            url:`/orders/${id}`,
            method:'DELETE'
        }),
        invalidatesTags:['Orders']
    })
  })
})

export const { useFetchOrdersQuery, useSendOrdersMutation, useDeleteOrderMutation } = ordersApi