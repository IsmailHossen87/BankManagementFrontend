import type { ComponentType } from "react"

export interface IResponse<T> {
    statusCode:number,
    success:boolean,
    message:string,
    data:T
}


export type IRole = "ADMIN" | "USER" 


export interface ISisebarItem {
    title:string,
    items:{
        title:string,
        url:string,
        component:ComponentType
    }[]
}