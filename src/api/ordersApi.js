import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
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