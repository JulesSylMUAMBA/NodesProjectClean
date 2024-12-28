import * as React from 'react';
const { createContext, useState  } = React;


interface UserContextType {
    user: { id: number; name: string; favoriteClub?: string; profilePhoto?: string } | null;
    setUser: React.Dispatch<React.SetStateAction<UserContextType['user']>>;
}


export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});


export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserContextType['user']>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
