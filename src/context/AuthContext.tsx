import {
    createContext,
    useState,
    useContext,
    useEffect,
    type ReactNode,
} from "react";
import {
    registerRequest,
    loginRequest,
    verifyTokenRequest,
    logout,
} from "../api/auth";

import Cookies from "js-cookie";

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

            const createdUser = res.data;
            setUser(createdUser);
            setIsAutheticaded(true);
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
            await logout();
            Cookies.remove("token");
            setUser(null);
            setIsAutheticaded(false);
        } catch (error: any) {
            console.error(error)
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
            try {
                const res = await verifyTokenRequest();
                if (res.data && Object.keys(res.data).length > 0) {
                    setIsAutheticaded(true);
                    setUser(res.data);
                } else {
                    setIsAutheticaded(false);
                    setUser(null);
                }
            } catch (error) {
                setIsAutheticaded(false);
                setUser(null);
            } finally {
                setLoading(false);
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
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
