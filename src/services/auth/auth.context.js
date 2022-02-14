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
        try {
            if (!email || !password) {
                setErrorMsg('Please enter valid email and password')
                return
            }
            setIsLoading(true)
            const res = await authService.loginRequest(email, password)
            res ? setUser(res) : setErrorMsg('Incorrect email or password')
            setIsLoading(false);
            return res ? true : false
        } catch (err) {
            console.log('Error in login:', err)
        }
    }

    const logout = async () => {
        try {
            setUser(null)
            await authService.logoutRequest()
        } catch (err) {
            console.log('Error in logout:', err)
        }
    }

    const register = async (email, password, repeatedPassword) => {
        try {
            if (!email || !password || !repeatedPassword) {
                setErrorMsg('Please enter valid email and password')
                return
            }
            setIsLoading(true);
            if (password !== repeatedPassword) setErrorMsg('Incompatible passwords')
            else if (password.length < 6) setErrorMsg('Password should be at least 6 characters')
            else {
                const user = await authService.registerRequest(email, password)
                user ? setUser(user) : setErrorMsg('The email address is badly formatted or used by another account')
            }
            setIsLoading(false);
        } catch (err) {
            console.log('Error in register:', err)
        }
    };

    const updatePassword = async (password) => {
        try {
            setIsLoading(true)
            await authService.updateAccountPassword(password)
            setIsLoading(false)
        } catch (err) {
            console.log('Error in logout:', err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register, updatePassword, errorMsg }}>
            {children}
        </AuthContext.Provider>
    )
}