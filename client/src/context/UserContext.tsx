import React, { createContext, useState } from 'react'
import { User, States } from '../Types/types'

export const UserContext = createContext<States>({
    posts: [],
    setPosts: () => {},
})

const UserProvider: React.FC<{ children: React.ReactElement }> = ({children}) => {
    const[posts, setPosts] = useState<User[]>([])
  return (
    <UserContext.Provider value={{posts, setPosts}} >
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider