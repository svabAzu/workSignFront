import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouterProps {
    redirectTo: string;
    children?: ReactNode;
}

export const ProtectedRouter = ({ redirectTo, children }: ProtectedRouterProps) => {
    const { isAutheticaded, loading } = useAuth();

    if (loading) return <h1>Loading...</h1>;

    if (!loading && !isAutheticaded) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};