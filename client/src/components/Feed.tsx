import React, { useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Feed = () => {
    const { posts, setPosts } = useContext(UserContext)

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await fetch(`http://localhost:8080/api`);
            const response = await data.json();
            setPosts(response)
        }
    }, [])

  return (
    <section>
        {posts ? <p></p> : ''}
    </section>
  )
}

export default Feed