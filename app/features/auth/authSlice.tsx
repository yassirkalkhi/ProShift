import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const signUp = createApi({
    reducerPath: 'signUp',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: (builder) => {
        return {
            signUp: builder.query({
                query: () => 'posts',
            }),
        };
    },
});

export const { useSignUpQuery } = signUp;