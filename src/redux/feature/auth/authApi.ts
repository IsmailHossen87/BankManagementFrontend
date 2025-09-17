
import { baseApi } from "@/redux/base.api";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo
            })
        }),
 
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        me: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags:["USER"]
        }),
        logOut:builder.mutation({
            query:()=>({
                url:"/auth/logout",
                method:"POST",  
            }),
             invalidatesTags: ["USER"],
        })
    })
})


export const { useLoginMutation,useRegisterMutation,useMeQuery,useLogOutMutation } = authApi;