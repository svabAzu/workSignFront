import { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import {
    registerRequest,
    loginRequest,
    //registerClienteRequest,
    verifyTokenRequest,
    logout
} from "../api/auth";

import Cookies from 'js-cookie';

interface AuthContextType {
    user: any;
    isAutheticaded: boolean;
    authErrors: any[];
    loading: boolean;
    signin: (user: any) => Promise<any>;
    signup: (user: any) => Promise<boolean>;
    logoutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deberia estar dentro de un AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any | null>(null);
    const [isAutheticaded, setIsAutheticaded] = useState(false);
    const [authErrors, setAuthErros] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)

    //console.log('user', user)

    const signup = async (user: any): Promise<boolean> => {
        try {
            const res = await registerRequest(user);
            console.log(res)
            setIsAutheticaded(true);
            return true;
          
        } catch (error: any) {
            if (Array.isArray(error.response.data)) {
                setAuthErros(error.response.data);
            } else {
                setAuthErros([error.response.data.message]);
            }
            return false;
        }
    };

    const signin = async (user: any): Promise<any> => {
        try {
            const res = await loginRequest(user);

            const createdUser = res.data; // Asegúrate de que devuelve el usuario creado
            setUser(createdUser); // Actualiza el contexto con el usuario
            setIsAutheticaded(true);
            // Devuelve el usuario creado
            return createdUser;

        } catch (error: any) {
            if (Array.isArray(error.response.data)) {
                return setAuthErros(error.response.data);
            }
            setAuthErros([error.response.data.message]);
        }
    };



    const logoutUser = async () => {
        try {
            const res = await logout();
            console.log(res);
            setUser(null);
            setIsAutheticaded(false);

        } catch (error: any) {
            if (Array.isArray(error.response.data)) {
                return setAuthErros(error.response.data);
            }
            setAuthErros([error.response.data.message]);
        }
    };

    useEffect(() => {
        if (authErrors.length > 0) {
            const timer = setTimeout(() => {
                setAuthErros([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [authErrors]);


    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAutheticaded(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest();
               
                if (res.data) {
                    setUser(res.data);
                    setIsAutheticaded(true);
                } else {
                    setUser(null);
                    setIsAutheticaded(false);
                }
            } catch (error) {
                console.error(error);
                setUser(null);
                setIsAutheticaded(false);
            } finally {
                setLoading(false); // Asegúrate de siempre finalizar el estado de carga
            }
        }

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                user,
                isAutheticaded,
                authErrors,
                loading,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
