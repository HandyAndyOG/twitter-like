import React from 'react'
import { useAuth0, LogoutOptions } from '@auth0/auth0-react'

interface LogoutOptionsWithReturnTo extends Omit<LogoutOptions, "onRedirect"> {
    returnTo: string;
  }
  
  const Logout: React.FC = () => {
    const { logout } = useAuth0();
  
    return (
      <button onClick={() => logout({ returnTo: window.location.origin } as LogoutOptionsWithReturnTo)}>
        Log Out
      </button>
    );
  };
  

export default Logout