import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouterProps {
    redirectTo: string;
    children?: ReactNode;
}

export const ProtectedRouter = ({ redirectTo, children }: ProtectedRouterProps) => {
    const { isAutheticaded, loading, user, logoutUser } = useAuth();
    //console.log(user)
    if (loading) return <h1>Loading...</h1>;

    // Si no está autenticado, redirige
    if (!loading && !isAutheticaded) {
        return <Navigate to={redirectTo} replace />;
    }

    // Si es operador (ID_type_user.ID_type_user === 2), bloquea acceso y muestra mensaje
    if (user && user.ID_type_user && user.ID_type_user.ID_type_user === 2) {
        const handleLogout = async () => {
            await logoutUser();
            window.location.href = '/login';
        };
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1F1F1]">
                <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Acceso denegado</h2>
                    <p className="mb-4">Tu usuario no tiene permisos para acceder a esta plataforma web.</p>
                    <button
                        onClick={handleLogout}
                        className="bg-[#199431] text-white px-6 py-2 rounded-full hover:bg-[#ADC708] hover:text-black"
                    >
                        Volver al login
                    </button>
                </div>
            </div>
        );
    }

    return children ? <>{children}</> : <Outlet />;
};