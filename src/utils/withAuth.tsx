

import { Navigate } from "react-router" 
import React from "react"
import type { IRole } from "@/type"
import { useMeQuery } from "@/redux/feature/auth/authApi"

export const withAuth = (Component: React.ComponentType, requiredRole?: IRole) => {

  return function AuthWrapper() { 
    const { data, isLoading } = useMeQuery(undefined) 


    if (!data?.data?.data?.email && !isLoading) {
      return <Navigate to="/login" />
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.data?.role) {
      return <Navigate to="/unauthorized" />
    }

    return <Component />
  }
}
