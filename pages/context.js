import React, { useState, createContext } from 'react';

// @ts-ignore
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    // can use reducer to manage states
    const [loginuseremail, setloginuseremail] = useState(undefined);
    const [loginexid, setloginexid] = useState(undefined);


    return (
        <UserContext.Provider
            value={{
                loginuseremail,
                setloginuseremail,
                loginexid, 
                setloginexid
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
