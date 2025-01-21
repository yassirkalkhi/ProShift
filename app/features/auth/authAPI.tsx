import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth/', // Adjust base URL if necessary
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: 'signup', // The endpoint path for signup
        method: 'POST',
        body: userData, // Send email and password in the request body
      }),
    }),
  }),
});

export const { useSignUpMutation } = authApi;
