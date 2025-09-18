
import { baseApi } from "@/redux/base.api";

export const PersonalDataApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        personalData: builder.mutation({
            query: (personalInfo) => ({
                url: "/info",
                method: "POST",
                data: personalInfo
            })
        })

    })
})


export const { usePersonalDataMutation } = PersonalDataApi;