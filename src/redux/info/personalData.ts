
import { baseApi } from "@/redux/base.api";

export const PersonalDataApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        personalData: builder.mutation({
            query: (personalInfo) => ({
                url: "/info",
                method: "POST",
                data: personalInfo
            })
        }),
        loanRequest: builder.mutation({
            query: (body) => ({
                url: "/info/loan-request",
                method: "PATCH",
                data:body
            })
        }),
        getPersonal: builder.query({
            query: () => ({
                url: "info/getMe",
                method: "GET",
            }),
            providesTags: ["PERSONALDATA"]
        }),

    })
})


export const { usePersonalDataMutation, useGetPersonalQuery, useLoanRequestMutation } = PersonalDataApi;