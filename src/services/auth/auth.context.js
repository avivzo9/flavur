import React, { createContext, useEffect, useState } from "react"
import { authService } from "./auth.service"
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) setUser(user)
            setIsLoading(false)
        })
    }, [])

    const login = async (email, password) => {
        setIsLoading(true)
        const res = await authService.loginRequest(email, password)
        res ? setUser(res) : setErrorMsg('Incorrect email or password')
        setIsLoading(false);
    }

    const logout = async () => {
        setUser(null)
        await authService.logoutRequest()
    }

    const register = async (email, password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) setErrorMsg('Incompatible passwords')
        else if (password.length < 6) setErrorMsg('Password should be at least 6 characters')
        else {
            const user = await authService.registerRequest(email, password)
            user ? setUser(user) : setErrorMsg('The email address is badly formatted or used by another account')
        }
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register, errorMsg }}>
            {children}
        </AuthContext.Provider>
    )
}