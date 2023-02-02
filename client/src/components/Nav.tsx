import React from 'react'

const Nav = () => {
    const handleClick = async() => {
        const data = await fetch('http://localhost:8080/profile')
        const response = await data.json()
        console.log(response)
    }

  return (
    <ul>
        {/* <button onClick={handleClick}>Login</button> */}

        <button><a href='http://localhost:8080/login'>Login</a></button>
    </ul>
  )
}

export default Nav