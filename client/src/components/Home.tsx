import React, { useEffect } from 'react'
import MakePost from './MakePost'
import Feed from './Feed'
import Nav from './Nav'

const Home = () => {

  return (
    <>
        <Nav />
        <MakePost />
        <Feed />
    </>
  )
}

export default Home