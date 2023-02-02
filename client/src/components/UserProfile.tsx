import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if(isLoading) {
    return <h2>Loading...</h2>
  }
  return (
    <>
        {isAuthenticated ? <div>
            <img src={user?.picture}/>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
        </div> : ''}
    </>
  )
}

export default UserProfile