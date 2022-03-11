import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                user.getIdTokenResult()
                    .then(idTokenResult => {
                        if (idTokenResult.claims.admin) {
                            setIsAdmin(true);
                        } else {
                            setIsAdmin(false);
                        }
                    })
                    .then(() => {
                        setCurrentUser(user);
                    })
            } else {
                setCurrentUser(null);
                setIsAdmin(false);
            }
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{currentUser, isAdmin}}
        >
            {children}
        </AuthContext.Provider>
    );
};
