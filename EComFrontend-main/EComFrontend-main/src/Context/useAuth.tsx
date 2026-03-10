import React, { createContext, useEffect, useState } from "react";
import { JwtPayload, UserProfile } from "../Models/User"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { homePageAPI, loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    register: (email: string, username: string, password: string) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => void;
    loadUserData: () => void;
    isTokenExpired:() => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if(token) {
            // setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        };
        setIsReady(true);
    }, []);

    const register = async (email: string, username: string, password: string) => {
        await registerAPI(email, username, password).then((result) => {
            if(result) {
                localStorage.setItem("token", result?.data.token);
                const userObject = {
                    username: result?.data.username,
                    email: result?.data.email,
                };
                localStorage.setItem("user", JSON.stringify(userObject));
                setToken(result?.data.token);
                // setUser(result?.data.);
                toast.success("Login Success!");
                navigate("/");
            }
        }).catch((err) => {
            toast.warning("Server error occured!");
        });;
    };

    const loginUser = async (email: string, password: string) => {
        try {
          const result = await loginAPI(email, password);
      
          if (result) {
            localStorage.setItem("token", result?.accessToken);
            console.log('token set local storage')
            // const userObject = {
            //   username: result?.data.username,
            //   email: result?.data.email,
            // };
            // localStorage.setItem("user", JSON.stringify(userObject));
      
            // Update the state variables (e.g., setToken and setUser) for app-wide access
            setToken(result?.accessToken);
            // setUser();
      
            // Show a success message using toast
            toast.success("Login Success!");
      
            

            // Navigate to the home page
            navigate("/home");

          }
        } catch (err) {
          // Handle errors during the login process (e.g., network issues, incorrect credentials)
          toast.warning("Server error occurred!");
        }
    };
        
    const loadUserData = async () => {
        const userData: UserProfile = await homePageAPI();
        setUser(userData);
    }

    const isLoggedIn = () => {
        return !!user;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    const isTokenExpired = (): boolean => {
        // Decode JWT (the second part of the token, which is the payload)
        let expirationTime: number = 0;
        let currentTime: number = Math.floor(Date.now() / 1000); // Get current time in seconds
  
        if (token) {
            const payload = token.split('.')[1]; // Get the second part of the token (payload)
    
        try {
            const decodedPayload: JwtPayload = JSON.parse(atob(payload));
            expirationTime = decodedPayload.exp; // Get the expiration time from the token

            // Return true if expired, false if not
            return expirationTime < currentTime;
        } catch (error) {
            console.error("Error decoding the token:", error);
             return true; // In case of error, consider the token as expired or invalid
        }
  }

    return true; // If there's no token, consider it as expired
      };

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn, register, loadUserData, isTokenExpired }}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
};

export const useAuth = () => React.useContext(UserContext);