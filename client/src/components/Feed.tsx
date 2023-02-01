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
        fetchPosts()
    }, [])
console.log(posts)
  return (
    <section>
        {posts ? <p></p> : ''}
    </section>
  )
}

export default Feed